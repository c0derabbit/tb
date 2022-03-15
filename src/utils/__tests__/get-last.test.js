import getLast from '../get-last'

describe('getLast', () => {
  const data = [
    { name: 'Scooby Doo', age: 3 },
    { name: 'Snoopy', age: 4 },
    { name: 'Seymour', age: 10 },
  ]

  it('gets last value by key', () => {
    expect(getLast(data, 'age')).toBe(10)
  })

  it('can get last value without key', () => {
    expect(getLast(['a' , 'b', 'c'])).toBe('c')
  })
})
