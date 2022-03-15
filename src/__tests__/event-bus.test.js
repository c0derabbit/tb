import EventBus from '../event-bus'

describe('EventBus', () => {
  const bus = new EventBus()
  const testFn = jest.fn()
  bus.addEventListener('testEvent', testFn)

  beforeEach(jest.clearAllMocks)

  it('sends and receives events successfully', () => {
    bus.dispatchEvent('testEvent')
    expect(testFn).toBeCalled()
  })

  it('ignores events whose listeners have been unregistered', () => {
    bus.dispatchEvent('testEvent')
    bus.removeEventListener('testEvent', testFn)
    bus.dispatchEvent('testEvent')
    expect(testFn).toHaveBeenCalledTimes(1)
  })

  it('ignores non-existent events', () => {
    bus.dispatchEvent('nonExistantEvent')
    expect(testFn).not.toBeCalled()
  })
})
