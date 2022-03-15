import EventBus from '../../event-bus'
import StatusMessage from '../status-message'

customElements.define('status-message', StatusMessage)

jest.useFakeTimers()

describe('StatusMessage', () => {
  window.EventBus = new EventBus()

  it('shows error message when an error event is dispatched', () => {
    const element = new StatusMessage()
    element.connectedCallback()

    window.EventBus.dispatchEvent('error', { error: 'oops' })
    expect(element.shadowRoot.querySelector('.error').innerText).toBe('oops')
  })

  it('removes message after timeout has passed', () => {
    const element = new StatusMessage()
    element.connectedCallback()

    window.EventBus.dispatchEvent('error', { error: 'blah' })
    expect(element.shadowRoot.querySelector('.error')).toBeTruthy()

    jest.advanceTimersByTime(4000)
    expect(element.shadowRoot.querySelector('.error')).toBeFalsy()
  })
})
