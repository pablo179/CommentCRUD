import status from "http-status";
import pool from "../db.js";

export const getComments = async (_req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Comments");
    res.status(status.OK).json(result);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const createComment = async (req, res) => {
  const { email, comment } = req.body;
  if (!email || !comment) {
    return res
      .status(status.BAD_REQUEST)
      .send("Email and Comment are required");
  }
  try {
    await pool.query("INSERT INTO Comments (email, comment) VALUES (?, ?)", [
      email,
      comment,
    ]);
    res.status(status.CREATED).send("Comment added successfully");
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(status.BAD_REQUEST).send("Comment ID is required");
  }
  try {
    await pool.query("DELETE FROM Comments WHERE id = ?", [id]);
    res.status(status.OK).json("Comment deleted successfully");
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send(err);
  }
}

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { email, comment } = req.body;
  if (!id || !email || !comment) {
    return res
      .status(status.BAD_REQUEST)
      .send("ID, Email and Comment are required");
  }
  try {
    await pool.query("UPDATE Comments SET email = ?, comment = ? WHERE id = ?", [
      email,
      comment,
      id,
    ]);
    res.status(status.OK).json("Comment updated successfully");
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).send(err);
  }
}