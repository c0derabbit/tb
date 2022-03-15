import { createStyle } from '../../elements'
import { ERROR_STYLE } from '../../style'

export default class StatusMessage extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    window.EventBus.addEventListener('error', event => {
      const errorMessage = document.createElement('div')
      errorMessage.classList.add('error')
      errorMessage.innerText = event.detail?.error?.toString() || 'Something went wrong'

      const style = createStyle(ERROR_STYLE)

      this.shadowRoot.append(style)
      this.shadowRoot.append(errorMessage)

      setTimeout(() => {
        this.shadowRoot.removeChild(errorMessage)
        this.shadowRoot.removeChild(style)
      }, 4000)
    })
  }
}
