import { Hono } from 'hono'
import { cors } from 'hono/cors'
import mainRouter from './routes/index.route'


const app = new Hono<{ Bindings: Env }>()

app.use('*', cors())

app.get('/', (c) => {
  return c.json({ message: 'Poster Vibe API' })
})

app.route('/api', mainRouter)

export default app
