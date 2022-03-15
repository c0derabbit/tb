import isNumber from '../is-number'

describe('isNumber', () => {
  it('returns true for number types', () => {
    ['Int8', 'UInt32', 'Float64', 'Decimal'].forEach(datatype => {
      expect(isNumber(datatype)).toBe(true)
    })
  })

  it('returns false for other types', () => {
    ['String', 'Boolean', 'DateTime', 'UUID'].forEach(datatype => {
      expect(isNumber(datatype)).toBe(false)
    })
  })
})
