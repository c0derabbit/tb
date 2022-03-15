export default function createChartHeader(el) {
  const header = document.createElement('header')
  header.classList.add('flex', 'gap-sm')

  const label = document.createElement('label')
  label.innerText = `Select property to compare against time of day`

  const select = document.createElement('select')
  select.setAttribute('id', `select_1`)
  select.addEventListener('change', el.handleSelect?.bind(el))

  el.meta?.forEach(({ name, type }) => {
    if (name === 'pickup_time') return

    const option = document.createElement('option')

    option.value = name
    option.innerText = name.replace('_', ' ')
    option.dataset.type = type
    option.selected = name === el.selectedKeys[1]

    select.appendChild(option)
  })

  label.appendChild(select)
  header.appendChild(label)

  return header
}
