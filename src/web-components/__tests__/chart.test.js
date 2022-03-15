import 'regenerator-runtime/runtime'
import Chart from '../chart'
import EventBus from '../../event-bus'

customElements.define('tb-chart', Chart)

describe('Chart', () => {
  const unmockedFetch = global.fetch

  beforeEach(jest.clearAllMocks)

  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve({
          meta: [{ name: 'foo', type: 'Int16' }, { name: 'bar', type: 'Int16' }],
          data: [{ foo: 1, bar: 2 }],
        }),
      })
  })

  afterAll(() => {
    global.fetch = unmockedFetch
  })

  window.EventBus = new EventBus()
  const chart = new Chart()

  it('creates header; creates and fills chart when connected', async () => {
    jest.spyOn(chart, 'createChartHeader')
    jest.spyOn(chart, 'createChart')

    await chart.connectedCallback()

    expect(chart.createChartHeader).toBeCalled()
    expect(chart.createChart).toBeCalled()
  })

  it('updates selected keys and fills chart on select change', () => {
    expect(chart.selectedKeys).not.toContain('foo')
    chart.handleSelect({
      target: {
        value: 'foo',
        id: 'select_0',
        parentElement: {
          querySelectorAll: () => [{
            value: 'bar',
            id: 'select_1',
            options: [{
              value: 'foo',
            }],
          }],
        },
      }
    })
    expect(chart.selectedKeys).toContain('foo')
  })
})
