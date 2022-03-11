import 'regenerator-runtime/runtime'

import EventBus from './event-bus'
import FooFoo from './components/foo'
import StatusMessage from './components/status-message'

window.EventBus = new EventBus()

customElements.define('foo-foo', FooFoo)
customElements.define('status-message', StatusMessage)
