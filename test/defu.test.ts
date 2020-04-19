import defu from '../src/defu'

// Part of tests brought from jonschlinkert/defaults-deep (MIT)

const nonObject = [null, undefined, [], false, true, 123]

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

  it('should handle non object first param', () => {
    for (const val of nonObject) {
      expect(defu(val, { d: true })).toEqual({ d: true })
    }
  })

  it('should handle non object second param', () => {
    for (const val of nonObject) {
      expect(defu({ d: true }, val)).toEqual({ d: true })
    }
  })

  it('multi defaults', () => {
    expect(defu({ a: 1 }, { b: 2, a: 'x' }, { c: 3, a: 'x', b: 'x' })).toEqual({
      a: 1,
      b: 2,
      c: 3
    })
  })

  it('should not override Object prototype', () => {
    const payload = JSON.parse('{"constructor": {"prototype": {"isAdmin": true}}}')
    defu({}, payload)
    defu(payload, {})
    defu(payload, payload)
    // @ts-ignore
    expect({}.isAdmin).toBe(undefined)
  })
})
