import { getTripdata } from '../../api'
import { getLast } from '../../utils'
import {
  createChart,
  createChartHeader,
  createDataPoint,
  createLoader,
  createStyle,
} from '../../elements'
import { CHART_STYLE } from '../../style'
import {
  SINGLE_PAX_RATIO_BY_15MIN_INTERVAL,
  TRIP_COUNT_BY_15MIN_INTERVAL,
} from '../../queries'

export default class Chart extends HTMLElement {
  queries = {
    'total_rides': {
      q: TRIP_COUNT_BY_15MIN_INTERVAL,
    },
    'single_passenger_rides': {
      q: SINGLE_PAX_RATIO_BY_15MIN_INTERVAL,
      formatter: val => `${val.toFixed(0)}%`,
    },
  }
  selectedKeys = ['pickup_time', 'total_rides']
  data
  xValues
  yValues

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(createLoader())
    this.shadowRoot.append(createStyle(CHART_STYLE))
  }

  async connectedCallback() {
    const params = new URLSearchParams(window.location.search)
    const query = params.get('q') || 'total_rides'
    this.selectedKeys[1] = query

    try {
      const res = await getTripdata(this.queries[query].q)
      const { data } = await res.json()

      this.data = data || []

      const chartComponents = [
        createChartHeader(this),
        createChart(this),
      ]

      const loader = this.shadowRoot.getElementById('loader')
      loader.innerText = ''

      this.shadowRoot.append(...chartComponents)
      this.updateChart()
    } catch (error) {
      window.EventBus.dispatchEvent('error', { error })
    }
  }

  async handleSelect(e) {
    const { id, value } = e.target
    const selectIdx = id.substr(-1)
    this.selectedKeys[selectIdx] = value
    window.history.pushState({}, '', `?q=${value}`)

    try {
      const res = await getTripdata(this.queries[value].q)
      const { data } = await res.json()
      this.data = data
      this.updateChart()
    } catch (error) {
      window.EventBus.dispatchEvent('error', { error })
    }
  }

  updateChart() {
    const group = this.shadowRoot.querySelector('svg g#datapoints')
    group.innerHTML = ''

    const [key0, key1] = this.selectedKeys
    this.xValues = this.data.map(d => d[key0])
    this.yValues = this.data.map(d => d[key1]).sort((a, b) => a - b)

    const maxX = this.data.length
    const maxY = key1 === 'single_passenger_rides' ? 100 : getLast(this.yValues, key1)

    this.updateLabels()

    this.data.forEach((datapoint, idx) => {
      const x = datapoint[key0]
      const y = datapoint[key1]

      const datapointElement = createDataPoint(
        typeof x === 'number' ? x : idx,
        typeof y === 'number' ? y : this.yValues.indexOf(y),
        maxX,
        maxY,
      )
      group.appendChild(datapointElement)
    })
  }

  updateLabels() {
    const { formatter } = this.queries[this.selectedKeys[1]]
    const xLabel = this.shadowRoot.getElementById('x-label')
    const yLabel = this.shadowRoot.getElementById('y-label')
    const xLabelValues = this.getLabelValues(this.xValues, 24)
    const yLabelValues = this.getLabelValues(this.yValues, 10, formatter)

    xLabel.innerHTML = `
      <small class="axis-legend">
        <span>${xLabelValues.join('</span><span>')}</span>
      </small>
      <span>${this.selectedKeys[0].replaceAll('_', ' ')}</span>
    `
    yLabel.innerHTML = `
      <span>${this.selectedKeys[1].replaceAll('_', ' ')}</span>
      <small class="axis-legend">
        <span><span>
          ${yLabelValues.join('</span></span><span><span>')}
        </span></span>
      </small>
    `
  }

  getLabelValues(values, labelCount, formatter = val => val) {
    const step = values.length >= labelCount ? Math.round(values.length / labelCount) : 1
    const labels = []
    const isPercentage = this.selectedKeys[1] === 'single_passenger_rides'

    if (typeof values[0] === 'number') {
      const max = isPercentage ? 100 : values[values.length - 1]
      return this.getLabelValuesInRange(max, labelCount, formatter)
    }

    for (let i = 0; i < values.length - step + 1; i += step)
      labels.push(formatter(values[i]))
    labels.push(values[values.length - 1])

    return labels
  }

  getLabelValuesInRange(max, labelCount, formatter) {
    const step = max >= labelCount ? Math.round(max / labelCount) : 1
    const labels = []

    for (let i = 0; i < max - step + 1; i += step)
      labels.push(formatter(i))
    labels.push(formatter(max))

    return labels
  }
}
