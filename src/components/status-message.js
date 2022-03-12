export default class StatusMessage extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    window.EventBus?.addEventListener('error', event => {
      const errorMessage = document.createElement('div')
      errorMessage.classList.add('error')
      errorMessage.innerText = event.detail?.error?.toString() || 'Something went wrong'

      const style = document.createElement('style')
      style.textContent = `
        @keyframes slide-in-out {
          from { transform: translateX(400px) }
          8% { transform: translateX(0) }
          92% { transform: translateX(0) }
          to { transform: translateX(400px) }
        }

        .error {
          font-size: var(--text-sm);
          color: var(--text-error);
          border: 1px solid var(--text-error);
          border-radius: var(--border-radius-sm);
          background: var(--bg-error);
          padding: var(--padding-sm);
          animation: slide-in-out 4s linear;
        }
      `

      this.shadowRoot.append(style)
      this.shadowRoot.append(errorMessage)

      setTimeout(() => {
        this.shadowRoot.removeChild(errorMessage)
        this.shadowRoot.removeChild(style)
      }, 4000)
    })
  }
}
