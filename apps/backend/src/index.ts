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
  const db = createDb(c.env)
  const allUsers = await db.select().from(users)
  return c.json(allUsers)
})

app.post('/users', async (c) => {
  const db = createDb(c.env)
  const body = await c.req.json()
  console.log('Creating user:', body)
  try {
    const insertData = {
      email: body.email as string,
      username: body.username as string,
      name: body.name as string,
      avatar: body.avatar as string,
    }
    console.log('Insert data:', insertData)
    const newUser = await db.insert(users).values(insertData).returning()
    console.log('New user created:', newUser)
    return c.json(newUser)
  } catch (err) {
    return c.json({ error: err  }, 500)
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
