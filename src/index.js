import 'regenerator-runtime/runtime'

import EventBus from './event-bus'
import Chart from './web-components/chart'
import StatusMessage from './web-components/status-message'

window.EventBus = new EventBus()

customElements.define('tb-chart', Chart)
customElements.define('status-message', StatusMessage)
