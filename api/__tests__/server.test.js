const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
//run seeds programatically before each test 
beforeEach(async () => {
  await db.seed.run()
})
//closes db 
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

test("testing our server.js", async () =>{ 
  const res = await request(server).get("/")
  expect(res.statusCode).toBe(200)
  expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(res.body.message).toBe("Checking if it's working as intended")
})