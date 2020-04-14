export interface Middleware<I = any> {
  use: (event: I) => Promise<any>
}
