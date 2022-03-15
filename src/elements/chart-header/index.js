export default function createChartHeader(el) {
  const header = document.createElement('header')
  header.classList.add('flex', 'gap-sm')

  ;['x', 'y'].forEach((axis, idx) => {
    const label = document.createElement('label')
    label.innerText = `${axis.toUpperCase()} axis`

    const select = document.createElement('select')
    select.setAttribute('id', `select_${idx}`)
    select.addEventListener('change', el.handleSelect?.bind(el))

    el.meta?.forEach(({ name, type }) => {
      const option = document.createElement('option')

      option.value = name
      option.innerText = name
      option.dataset.type = type
      option.selected = name === el.selectedKeys[idx]

      select.appendChild(option)
    })

    label.appendChild(select)
    header.appendChild(label)
  })

  return header
}
