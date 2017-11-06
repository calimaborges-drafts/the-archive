import { catcher } from "../commons/rest-error";
import { ObjectID } from "mongodb";
import auth from "../misc/auth-middleware";
import { sanitizeTask } from "../tasks/tasks-sanitizer";

export const tasksService = (app, database) => {
  app.use("/tasks", catcher(auth(database)));

  app.get(
    "/tasks",
    catcher(async (req, res) => {
      let collection = database.collection("tasks");
      let docs = await collection
        .aggregate([
          {
            $match: {
              userid: { $in: [new ObjectID(req.user._id), null] },
              deleted_at: null
            }
          }
        ])
        .toArray();

      res.send(docs);
    })
  );

  app.post(
    "/tasks",
    catcher(async (req, res) => {
      let collection = database.collection("tasks");
      let task = sanitizeTask(req.body);
      delete task._id;
      task.userid = req.user._id;
      const response = await collection.insertOne(task);

      task = response.ops[0];
      res.send(JSON.stringify(task));
    })
  );

  app.put(
    "/tasks/:id",
    catcher(async (req, res) => {
      let task = sanitizeTask(req.body);
      delete task._id;
      task.userid = req.user._id;
      const response = await database
        .collection("tasks")
        .findAndModify(
          { _id: ObjectID(req.params.id) },
          undefined,
          { $set: task },
          { new: true }
        );
      res.send(JSON.stringify(response.value));
    })
  );

  app.delete(
    "/tasks/:id",
    catcher(async (req, res) => {
      const response = await database
        .collection("tasks")
        .findAndModify(
          { _id: ObjectID(req.params.id) },
          undefined,
          { $set: { deleted_at: new Date() } },
          { new: true }
        );
      res.send(JSON.stringify(response.value));
    })
  );

  // ACTIONS
  app.patch(
    "/tasks/:id/actions/complete",
    catcher(async (req, res) => {
      const response = await database
        .collection("tasks")
        .findAndModify(
          { _id: ObjectID(req.params.id) },
          undefined,
          { $set: { completed: true } },
          { new: true }
        );
      res.send(JSON.stringify(response.value));
    })
  );

  app.patch(
    "/tasks/:id/actions/postpone",
    catcher(async (req, res) => {
      const response = await database
        .collection("tasks")
        .findAndModify(
          { _id: ObjectID(req.params.id) },
          undefined,
          { $set: { postpone_date: Date.parse(req.body.postpone_date) } },
          { new: true }
        );
      res.send(JSON.stringify(response.value));
    })
  );
};
