export default function createStyle(css) {
  const style = document.createElement('style')
  style.textContent = css

  return style
}
