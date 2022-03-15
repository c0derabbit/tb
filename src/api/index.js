export async function getTripdata(query) {
  const url = `https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json?q=${query}`

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
