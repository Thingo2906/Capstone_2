const jwt = require("jsonwebtoken");
const { createToken } = require("./token");
const { SECRET_KEY } = require("../config");

//Test token for not admin
// iat mean issued at, it is included by JWT libraries when a token is created
describe("createToken", function () {
  test("work: not admin", function () {
    const token = createToken({ username: "test", is_admin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      is_admin: false,
    });
  });

  // Test token for admin
  test("work for admin", function(){
    const token = createToken({username: "test", is_admin: true});
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
        iat: expect.any(Number),
        username: "test",
        is_admin: true
    })
  });

  // Test token for defaut not admin
  test("work for default no admin", function(){
    const token = createToken({username: "test"});
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
        iat: expect.any(Number),
        username: "test",
        is_admin: false
    })
  })
});

