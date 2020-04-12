import { Either, Left, Right, left, right, isLeft, isRight } from '@rimo/monad'

/**
 * Either test
 */
describe('Either test', () => {
  describe('Left', () => {
    it('should create a left value', () => {
      const error = new Error('dang')
      const l: Either<Error, string> = left(error)
      expect(isLeft(l)).toBeTruthy()
      expect(isLeft(l) && l.left).toBe(error)
      expect(isRight(l)).toBeFalsy()
    })
  })

  describe('Right', () => {
    it('should create a right value', () => {
      const r: Either<Error, string> = right('success')
      expect(isRight(r)).toBeTruthy()
      expect(isRight(r) && r.right).toBe('success')
      expect(isLeft(r)).toBeFalsy()
    })
  })
})
