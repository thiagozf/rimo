export type Mixed = any

type Compose<CS extends [Mixed, Mixed, ...Array<Mixed>]> = CS extends { length: 2 }
  ? CS[0] & CS[1]
  : CS extends { length: 3 }
  ? CS[0] & CS[1] & CS[2]
  : CS extends { length: 4 }
  ? CS[0] & CS[1] & CS[2] & CS[3]
  : CS extends { length: 5 }
  ? CS[0] & CS[1] & CS[2] & CS[3] & CS[4]
  : CS extends { length: 6 }
  ? CS[0] & CS[1] & CS[2] & CS[3] & CS[4] & CS[5]
  : CS extends { length: 7 }
  ? CS[0] & CS[1] & CS[2] & CS[3] & CS[4] & CS[5] & CS[6]
  : CS extends { length: 8 }
  ? CS[0] & CS[1] & CS[2] & CS[3] & CS[4] & CS[5] & CS[6] & CS[7]
  : CS extends { length: 9 }
  ? CS[0] & CS[1] & CS[2] & CS[3] & CS[4] & CS[5] & CS[6] & CS[7] & CS[8]
  : CS extends { length: 10 }
  ? CS[0] & CS[1] & CS[2] & CS[3] & CS[4] & CS[5] & CS[6] & CS[7] & CS[8] & CS[9]
  : unknown

/**
 * A simple function that composes multiple objects into one.
 *
 * @param objs the objects that will compose the result
 */
export function compose<CS extends [Mixed, Mixed, ...Array<Mixed>]>(...objs: CS): Compose<CS> {
  return objs.reduce((a, b) => ({ ...a, ...b }), {})
}
