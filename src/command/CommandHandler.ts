export interface CommandHandler<I = any, O = any> {
  handle: (event: I) => Promise<O>
}
