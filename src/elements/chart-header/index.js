export default function createChartHeader(el) {
  const header = document.createElement('header')
  header.classList.add('flex', 'gap-sm')

  const label = document.createElement('label')
  label.innerText = `Select property to compare against time of day`

  const select = document.createElement('select')
  select.setAttribute('id', `select_1`)
  select.addEventListener('change', el.handleSelect?.bind(el))

  Object.keys(el.queries).forEach(key => {
    const option = document.createElement('option')

    option.value = key
    option.innerText = key.replaceAll('_', ' ')
    option.selected = key === el.selectedKeys[1]

    select.appendChild(option)
  })

  label.appendChild(select)
  header.appendChild(label)

  return header
}
