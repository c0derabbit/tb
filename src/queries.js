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

export const AVG_TRIP_DISTANCE_BY_15MIN_INTERVAL = `
  SELECT
    formatDateTime(toStartOfFifteenMinutes(tpep_pickup_datetime), '%R') as pickup_time,
    avg(trip_distance) as average_trip_distance
  FROM
    _
  GROUP BY
    pickup_time
  ORDER BY
    pickup_time ASC
`

export const AVG_FARE_AMOUNT_BY_15MIN_INTERVAL = `
  SELECT
    formatDateTime(toStartOfFifteenMinutes(tpep_pickup_datetime), '%R') as pickup_time,
    avg(toFloat32(fare_amount)) as average_fare_amount
  FROM
    _
  GROUP BY
    pickup_time
  ORDER BY
    pickup_time ASC
`

export const FARE_AMOUNT_PER_MILE_BY_15MIN_INTERVAL = `
  SELECT
    formatDateTime(toStartOfFifteenMinutes(tpep_pickup_datetime), '%R') as pickup_time,
    avg(toFloat32(fare_amount)) / avg(trip_distance) as fare_amount_per_mile
  FROM
    _
  GROUP BY
    pickup_time
  ORDER BY
    pickup_time ASC
`
