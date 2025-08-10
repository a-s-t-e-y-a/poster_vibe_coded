import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createDb } from './db'
import { users } from './db/schema'
import { eq } from 'drizzle-orm'

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors())

app.get('/', (c) => {
  return c.json({ message: 'Poster Vibe API' })
})

app.get('/users', async (c) => {
  return c.json({ message: 'users' })
})

app.post('/users', async (c) => {
  const db = createDb(c.env)
  const body = await c.req.json()
  try {
    const newUser = await db.insert(users).values({
      email: body.email,
      username: body.username,
      name: body.name,
      avatar: body.avatar || null,
    }).returning()
    return c.json(newUser[0])
  } catch (err) {
    return c.json({ error: err instanceof Error ? err.message : 'Unknown error' }, 500)
  }
})

app.get('/users/:id', async (c) => {
  const db = createDb(c.env)
  const id = parseInt(c.req.param('id'))

  const user = await db.select().from(users).where(eq(users.id, id)).limit(1)

  if (user.length === 0) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json(user[0])
})

app.put('/users/:id', async (c) => {
  const db = createDb(c.env)
  const id = parseInt(c.req.param('id'))
  const body = await c.req.json()

  const updatedUser = await db.update(users)
    .set({
      email: body.email,
      username: body.username,
      name: body.name,
      avatar: body.avatar,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning()

  if (updatedUser.length === 0) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json(updatedUser[0])
})

app.delete('/users/:id', async (c) => {
  const db = createDb(c.env)
  const id = parseInt(c.req.param('id'))

  const deletedUser = await db.delete(users).where(eq(users.id, id)).returning()

  if (deletedUser.length === 0) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json({ message: 'User deleted successfully' })
})

export default app
