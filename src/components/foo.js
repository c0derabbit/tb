export default class FooFoo extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    const img = document.createElement('img')
    img.src = this.hasAttribute('img') ? this.getAttribute('img') : 'https://placekitten.com/200/200'

    this.shadowRoot.append(img)
  }

  async connectedCallback() {
    try {
      const res = await getTripdata()
      console.log('got it', res)
    } catch (error) {
      window.EventBus?.dispatchEvent('error', { error })
    }
  }
}

async function getTripdata() {
  const url = 'https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json?q=SELECT * FROM _ LIMIT 20'

  const headers = new Headers()
  headers.append(
    'Authorization',
    'Bearer p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c'
  )

  var requestOptions = {
    method: 'GET',
    headers,
  }

  return await fetch(url, requestOptions)
}
