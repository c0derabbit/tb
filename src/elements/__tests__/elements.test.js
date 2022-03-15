import {
  createChart,
  createChartHeader,
  createDataPoint,
  createLabel,
  createLoader,
  createStyle,
} from '..'

describe('elements', () => {
  describe('chart', () => {
    it('creates svg with datapoints group', () => {
      const chart = createChart()

      expect(chart.innerHTML).toContain('<svg')
      expect(chart.innerHTML).toContain('<g id="datapoints">')
    })
  })

  describe('chartHeader', () => {
    it('has selects for chart axes', () => {
      const testElement = {
        meta: [],
        handleSelect: () => {},
      }
      const header = createChartHeader(testElement)

      expect(header.innerHTML).toContain('<select id="select_1">')
    })
  })

  describe('createDataPoint', () => {
    it('creates svg element with correct coordinates', () => {
      const datapoint = createDataPoint(1, 2, 4, 4)

      expect(datapoint.outerHTML).toContain('<line x1="25%" y1="50%"')
    })
  })

  describe('createLabel', () => {
    it('creates div with axis name', () => {
      const label = createLabel('z')

      expect(label.outerHTML).toContain('<div id="z-label">')
    })
  })

  describe('createLoader', () => {
    it('creates loading text', () => {
      const loader = createLoader()

      expect(loader.outerHTML).toEqual('<p id="loader"></p>')
      expect(loader.innerText).toContain('Loading')
    })
  })

  describe('createStyle', () => {
    it('creates style element with provided text content', () => {
      const style = createStyle('foo')

      expect(style.outerHTML).toContain('<style>')
      expect(style.innerHTML).toBe('foo')
    })
  })
})
