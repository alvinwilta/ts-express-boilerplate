import request from "supertest";

import app from "../server";

describe("CHECK CONN", () => {
  it("Checking connection to server", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });
});
