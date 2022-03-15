export default function createLabel(axis) {
  const label = document.createElement('div')
  label.setAttribute('id', `${axis}-label`)

  return label
}
