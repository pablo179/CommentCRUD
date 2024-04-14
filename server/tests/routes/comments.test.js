import status from "http-status";
import request from "supertest";
import app from "../../app";

describe("Comments routes", () => {
  let commentId;
  const mockComment = "Test comment";
  const mockEmail = "email@comment.com";

  it("should create a comment", async () => {
    const response = await request(app)
      .post("/comments")
      .send({ comment: mockComment, email: mockEmail });
    expect(response.status).toBe(status.CREATED);
  });

  it("should throw an error if comment is empty", async () => {
    const response = await request(app)
      .post("/comments")
      .send({ comment: "", email: mockEmail });
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  it("should throw an error if email is empty", async () => {
    const response = await request(app)
      .post("/comments")
      .send({ comment: mockComment, email: "" });
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  it("should return all comments", async () => {
    const response = await request(app).get("/comments");
    expect(response.status).toBe(status.OK);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((comment) => {
      expect(comment).toHaveProperty("id");
      expect(comment).toHaveProperty("comment");
      expect(comment).toHaveProperty("email");
    });
    const comment = response.body.find((c) => c.email === mockEmail);
    expect(comment.comment).toBe(mockComment);
    expect(comment.email).toBe(mockEmail);
    commentId = comment.id;
  });

  it("should update a comment", async () => {
    const response = await request(app)
      .put(`/comments/${commentId}`)
      .send({ comment: "Updated comment", email: mockEmail });
    expect(response.status).toBe(status.OK);
    const comments = await request(app).get("/comments");
    const comment = comments.body.find((c) => c.id === commentId);
    expect(comment.comment).toBe("Updated comment");
  })
  it("should throw an error if comment is empty", async () => {
    const response = await request(app)
      .put(`/comments/${commentId}`)
      .send({ comment: "", email: mockEmail });
    expect(response.status).toBe(status.BAD_REQUEST);
  })
  it("should throw an error if email is empty", async () => {
    const response = await request(app)
      .put(`/comments/${commentId}`)
      .send({ comment: mockComment, email: "" });
    expect(response.status).toBe(status.BAD_REQUEST);
  })
  it("should throw an error if comment does not exist", async () => {
    const response = await request(app)
      .put(`/comments/999`)
      .send({ comment: "Updated comment", email: mockEmail });
    expect(response.status).toBe(status.NOT_FOUND);
  })
  it("should delete a comment", async () => {
    const response = await request(app).delete(`/comments/${commentId}`);
    expect(response.status).toBe(status.OK);
    const comments = await request(app).get("/comments");
    const comment = comments.body.find((c) => c.id === commentId);
    expect(comment).toBeUndefined();
  });
  it("should throw an error if comment does not exist", async () => {
    const response = await request(app).delete(`/comments/999`);
    expect(response.status).toBe(status.NOT_FOUND);
  });
  it("should throw an error if route does not exist", async () => {
    const response = await request(app).get("/comments/notexists/999");
    expect(response.status).toBe(status.NOT_FOUND);
  })
});
