import { getTripdata } from '../../api'
import { getLast, isNumber } from '../../utils'
import {
  createChart,
  createChartHeader,
  createDataPoint,
  createLoader,
  createStyle,
} from '../../elements'
import { CHART_STYLE } from '../../style'
import { TRIP_COUNT_BY_15MIN_INTERVAL } from '../../queries'

export default class Chart extends HTMLElement {
  selectedKeys = ['pickup_time', 'total_rides']
  data
  meta
  xValues
  yValues

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(createLoader())
    this.shadowRoot.append(createStyle(CHART_STYLE))
  }

  async connectedCallback() {
    try {
      const res = await getTripdata(TRIP_COUNT_BY_15MIN_INTERVAL)
      const { meta, data } = await res.json()

      this.data = data || []
      this.meta = meta || []

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

  handleSelect(e) {
    const { id, value } = e.target
    const selectIdx = id.substr(-1)
    this.selectedKeys[selectIdx] = value
    this.updateChart()
  }

  updateChart() {
    const group = this.shadowRoot.querySelector('svg g#datapoints')
    group.innerHTML = ''

    const [key0, key1] = this.selectedKeys
    this.xValues = this.data.map(d => d[key0])
    this.yValues = this.data.map(d => d[key1]).sort((a, b) => a - b)

    const keyType = (key) => this.meta.find(({ name }) => name === key)?.type
    const getMax = (data, key) => isNumber(keyType(key))
      ? getLast(data, key)
      : data.length

    const maxX = getMax(this.data, key0)
    const maxY = getMax(this.yValues, key1)

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
    const xLabel = this.shadowRoot.getElementById('x-label')
    const yLabel = this.shadowRoot.getElementById('y-label')
    const xLabelValues = this.getLabelValues(this.xValues, 24)
    const yLabelValues = this.getLabelValues(this.yValues, 10)

    xLabel.innerHTML = `
      <small class="axis-legend">
        <span>${xLabelValues.join('</span><span>')}</span>
      </small>
      <span>${this.selectedKeys[0].replace('_', ' ')}</span>
    `
    yLabel.innerHTML = `
      <span>${this.selectedKeys[1].replace('_', ' ')}</span>
      <small class="axis-legend">
        <span><span>
          ${yLabelValues.join('</span></span><span><span>')}
        </span></span>
      </small>
    `
  }

  getLabelValues(values, labelCount) {
    const step = values.length >= labelCount ? Math.round(values.length / labelCount) : 1
    const labels = []

    if (typeof values[0] === 'number')
      labels.push(0)

    for (let i = 0; i < values.length - step + 1; i += step)
      labels.push(values[i])
    labels.push(values[values.length - 1])

    return labels
  }
}
