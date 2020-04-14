export interface Container {
  get(someClass: any): any
}

export class DefaultContainer {
  private instances: Map<any, any> = new Map()

  get<T>(Clazz: any): T {
    if (!this.instances.has(Clazz)) {
      const handler = new Clazz()

      this.instances.set(Clazz, handler)

      return handler
    }

    return this.instances.get(Clazz) as T
  }
}
