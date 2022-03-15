export const TRIP_COUNT_BY_15MIN_INTERVAL = `
  SELECT
    formatDateTime(toStartOfFifteenMinutes(tpep_pickup_datetime), '%R') as pickup_time,
    count() as total_rides
  FROM
    _
  GROUP BY
    pickup_time
  ORDER BY
    pickup_time ASC
`

export const SINGLE_PAX_RATIO_BY_15MIN_INTERVAL = `
  SELECT
    formatDateTime(toStartOfFifteenMinutes(tpep_pickup_datetime), '%R') as pickup_time,
    countIf(passenger_count=1) / count() * 100 as single_passenger_rides
  FROM
    _
  GROUP BY
    pickup_time
  ORDER BY
    pickup_time ASC
`
