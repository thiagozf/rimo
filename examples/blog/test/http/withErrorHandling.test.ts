import { withErrorHandling } from '../../src/http/withErrorHandling'
import { ServerRoute } from '@hapi/hapi'

describe('withErrorHandling tests', () => {
  it('should return 500 on unhandled errors', async () => {
    const route: ServerRoute = {
      path: '/',
      method: 'get',
      handler: async () => {
        throw new Error('Unhandled error')
      },
    }

    const enhancedRoute = withErrorHandling([route])[0]
    const method = enhancedRoute.handler as any
    const response = await method()

    expect(response.output.statusCode).toBe(500)
  })
})
