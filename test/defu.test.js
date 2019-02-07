const defu = require('..')

// Tests brought from jonschlinkert/defaults-deep (MIT)

describe('defu', () => {
  it('should copy only missing properties defaults', () => {
    expect(defu({ a: 'c' }, { a: 'bbb', d: 'c' })).toEqual({ a: 'c', d: 'c' })
  })

  it('should fill in values that are null', () => {
    expect(defu({ a: null }, { a: 'c', d: 'c' })).toEqual({ a: 'c', d: 'c' })
  })

  it('should copy nested values.', () => {
    expect(defu({ a: { b: 'c' } }, { a: { d: 'e' } })).toEqual({ a: { b: 'c', d: 'e' } })
  })

  it('should not override Object prototype', () => {
    var payload = JSON.parse('{"constructor": {"prototype": {"isAdmin": true}}}')
    defu({}, payload)
    expect({}.isAdmin).toBe(undefined)
  })
})
