import { server } from './server'

async function start() {
  try {
    await server.start()
    console.log(`🚀 Server running at: ${server.info.uri}`)
  } catch (err) {
    console.error('⚠️ Error starting server', err)
    throw err
  }
}

start()
