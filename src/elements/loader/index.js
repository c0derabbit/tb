export default function createLoader() {
  const loader = document.createElement('p')
  loader.setAttribute('id', 'loader')
  loader.innerText = 'Loading…'

  return loader
}
