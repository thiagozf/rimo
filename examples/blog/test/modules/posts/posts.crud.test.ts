import '../../../src/di'
import { server } from '../../../src/http/server'
import { PostInput } from '../../../src/modules/posts/post.io'

describe('Posts CRUD', () => {
  beforeEach(async () => {
    return await server.initialize()
  })

  afterEach(async () => {
    return await server.stop()
  })

  it('should create, retrieve, update and delete posts', async () => {
    const post: PostInput = {
      title: 'My post',
      author: 'thiagozf',
      content: 'My post text',
    }

    const badRouteResponse = await server.inject({
      method: 'get',
      url: '/posts/bla/bla',
    })
    expect(badRouteResponse.statusCode).toBe(404)

    // Create
    const createResponse = await server.inject({
      method: 'post',
      url: '/posts',
      payload: post,
    })
    expect(createResponse.statusCode).toBe(200)
    expect(createResponse.result).toMatchObject({
      author: 'thiagozf',
      content: 'My post text',
      title: 'My post',
      slug: 'my-post',
    })

    const id: string = (createResponse.result as any).id
    expect(id).toBeDefined()

    // Retrieve
    const retrieveResponse = await server.inject({
      method: 'get',
      url: `/posts/${id}`,
    })
    expect(retrieveResponse.statusCode).toBe(200)
    expect(retrieveResponse.result).toMatchObject({
      id,
      author: 'thiagozf',
      content: 'My post text',
      title: 'My post',
      slug: 'my-post',
    })

    // Retrieve all
    const retrieveAllResponse = await server.inject({
      method: 'get',
      url: '/posts',
    })
    expect(retrieveAllResponse.statusCode).toBe(200)
    expect(retrieveAllResponse.result).toMatchObject([
      {
        id,
        author: 'thiagozf',
        content: 'My post text',
        title: 'My post',
        slug: 'my-post',
      },
    ])

    // Update
    const updateResponse = await server.inject({
      method: 'put',
      url: `/posts/${id}`,
      payload: {
        title: 'My post change',
      },
    })
    expect(updateResponse.statusCode).toBe(200)
    expect(updateResponse.result).toMatchObject({
      id,
      author: 'thiagozf',
      content: 'My post text',
      title: 'My post change',
      slug: 'my-post-change',
    })
  })

  it('should handle invalid inputs', async () => {
    const badCreateResponse = await server.inject({
      method: 'post',
      url: '/posts',
      payload: {},
    })
    expect(badCreateResponse.statusCode).toBe(422)

    const notFoundRetrieveResponse = await server.inject({
      method: 'get',
      url: '/posts/stub',
    })
    expect(notFoundRetrieveResponse.statusCode).toBe(404)

    const notFoundUpdateResponse = await server.inject({
      method: 'put',
      url: '/posts/stub',
      payload: {
        title: 'Welcome to Rimo',
        author: 'thiagozf',
        content: 'Bla bla bla',
      },
    })
    expect(notFoundUpdateResponse.statusCode).toBe(404)

    const badUpdateResponse = await server.inject({
      method: 'put',
      url: '/posts/stub',
      payload: {
        title: 123,
      },
    })
    expect(badUpdateResponse.statusCode).toBe(422)
  })
})
