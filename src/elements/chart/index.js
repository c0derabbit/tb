import { createSVGElement } from '../helpers'
import createLabel from '../label'

export default function createChart() {
  const chart = document.createElement('div')

  const svg = createSVGElement('svg')
  svg.setAttribute('width', '80vw')
  svg.setAttribute('height', '60vh')
  svg.style.margin = '20px 0 50px 70px'
  svg.innerHTML = `
    <line x1="0" y1="0%" x2="0%" y2="100%" stroke="black" />
    <line x1="0" y1="100%" x2="100%" y2="100%" stroke="black" />
    <g id="datapoints"></g>
  `

  chart.appendChild(svg)
  chart.appendChild(createLabel('x'))
  chart.appendChild(createLabel('y'))

  return chart
}
