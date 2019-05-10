/* eslint-disable */

const db = require('quick.db')

class Foo {
  constructor(data) {
    this.data = data
  }

  bar() {
    return true
  }
}

describe('Test setting data to DB', () => {
  test('should set objects to DB', () => {
    db.set('123', { 
      foo: 'bar'
    })

    expect(db.get('123.foo')).toBe('bar')
  })
})