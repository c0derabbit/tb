import { createSVGElement } from '../helpers'

export default function createDataPoint(x, y, maxX, maxY) {
  const point = createSVGElement('circle')
  point.setAttribute('cx', `${x/maxX * 100}%`)
  point.setAttribute('cy', `${(1 - y/maxY) * 100}%`)
  point.setAttribute('r', 2)
  point.classList.add('point')

  return point
}
