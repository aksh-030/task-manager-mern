import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("tasks");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("tasks");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    Title: req.body.Title,
    Progress: req.body.Progress,
    DueDate: req.body.DueDate,
    Course: req.body.Course,
  };
  let collection = await db.collection("tasks");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      Title: req.body.Title,
      Progress: req.body.Progress,
      DueDate: req.body.DueDate,
      Course: req.body.Course,
    }
  };

  let collection = await db.collection("tasks");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("tasks");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;