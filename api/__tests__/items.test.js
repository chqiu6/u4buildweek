const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')
const jwt = require("jsonwebtoken");
const { expectCt } = require('helmet');
require("dotenv").config();
let token = "";
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

describe("testing our items route", () => {
    it("post login then get items", async () =>{
        const res = await request(server)
        .post("/api/users/login")
        .send({username: "user1", password: "abc123"})
           .set(`Authorization`, `Bearer ${token}`)
        console.log("login request res body", res.body);
        token = res.body.token;
        console.log("res body login ", res.body)
        console.log("login token res body", token);

        await request(server)
         .get("/api/items")
         .set(`Authorization`, `${token}`);
         console.log("get items res body", res.body);
         console.log("get items", token);
         expect(res.statusCode).toBe(200)
    })

    it("get category id", async () =>{
      const res = await request(server)
        .post("/api/users/login")
        .send({username: "user1", password: "abc123"})
        .set(`Authorization`, `Bearer ${token}`)
        console.log("login request res body", res.body);
        token = res.body.token;

        await request(server)
        .get("/api/items/category/1")
        expect(res.statusCode).toBe(200);
        console.log("category res body", res.body);
        console.log("category token", token);
    })

    it("get owner items", async () =>{
      const res = await request(server)
        .post("/api/users/login")
        .send({username: "user1", password: "abc123"})
        .set(`Authorization`, `Bearer ${token}`)
        console.log("login request res body", res.body);
        token = res.body.token;

         await request(server)
        .get("/api/items/owner/1")
        console.log("owner res body", res.body)
        expect(res.statusCode).toBe(200)
    })

    it("post add items", async () =>{
      const res = await request(server)
        .post("/api/users/login")
        .send({username: "user1", password: "abc123"})
        .set(`Authorization`, `Bearer ${token}`)
        console.log("login request res body", res.body);
        token = res.body.token;

        await request(server)
        .post("/api/items")
        console.log("post add items res body", res.body)
        expect(res.statusCode).toBe(200)
    })

    it("put update items", async () =>{
      const res = await request(server)
        .post("/api/users/login")
        .send({username: "user1", password: "abc123"})
        .set(`Authorization`, `Bearer ${token}`)
        console.log("login request res body", res.body);
        token = res.body.token;

        await request(server)
        .put("/api/items/1")
        console.log("put update items res body", res.body)
        expect(res.statusCode).toBe(200)
    })

    it("delete items", async () =>{
      const res = await request(server)
        .post("/api/users/login")
        .send({username: "user1", password: "abc123"})
        .set(`Authorization`, `Bearer ${token}`)
        console.log("login request res body", res.body);
        token = res.body.token;

        await request(server)
        .delete("/api/items/1")
        console.log("delete res body", res.body)
        expect(res.statusCode).toBe(200)
    })
})