"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/**authenticate */
describe("authenticate", function(){
    test("works", async function(){
        const user = await User.authenticate("u1", "password1");
        expect(user).toEqual({
            username: "u1",
            email: "u1@gmail.com",
            isAdmin: false
        })
    });
    test("unauth if no such user", async function(){
        try{
            await User.authenticate("a1", "password");
            fail();

        }catch(err){
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
    test("unauth if wrong password", async function(){
        try{
            await User.authenticate("u1", "wrong");
            fail();

        }catch(err){
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    })
})

/****register */
describe("register", function(){
     const newUser = {
       username: "new",
       email: "new@gmail.com",
       isAdmin: false,
     };
        
    test("works for new user", async function(){
        const user = User.register({...newUser, password: "password"});
        expect(user).toEqual(newUser);
        const found = await db.query("SELECT * FROM users WHERE username = 'new' ");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].is_admin).toEqual(false);
        expect(found.rows[0].password).startswith("$2b$").toEqual(true);
       
    });
    test("work with admin user", async function(){
        const user = User.register({...newUser, password: "password", isAdmin : true});
        expect(user).toEqual(newUser);
        const found = await db.query("SELECT * FROM users WHERE username = 'new'");
        expect(found.rows.length).toEqual(1);
         expect(found.rows[0].is_admin).toEqual(true);
         expect(found.rows[0].password).startswith("$2b$").toEqual(true);
    });
    test("bad request with dup data", async function () {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

