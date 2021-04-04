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

test("testing our users route", async () => {
    const res = await request(server).get("/api/users")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.length).toBe(3)
})

describe("testing our users router",() => {
    it("register route", async() =>{
        const res = await request(server)
        .post("/api/users/register")
        .send({username : "test1", password: "123456"})
        expect(res.statusCode).toBe(201)
        expect(res.body.username).toBe("test1")
    })
    it("login route", async() =>{
        const res = await request(server)
        .post("/api/users/login")
        .send({username: "user1", password: "abc123"})
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe(`Welcome, user1!`)
    })
})