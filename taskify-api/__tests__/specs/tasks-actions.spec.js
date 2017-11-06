import fetch from "node-fetch";
import {
  useServer,
  database,
  serverPath,
  authHeaders
} from "../libs/test-helpers.lib";
import { jsonHeader } from "../../src/commons/rest-headers";

useServer();

describe("task actions", () => {
  it("should complete a task", async () => {
    const taskToComplete = { title: "title1", content: "content1" };
    const r1 = await database.collection("tasks").insertOne(taskToComplete);
    const taskId = r1.ops[0]._id;

    const response = await fetch(
      serverPath(`/tasks/${taskId}/actions/complete`),
      {
        method: "PATCH",
        headers: {
          ...jsonHeader,
          ...authHeaders
        }
      }
    );
    expect(response.ok).toBeTruthy();

    const json = await response.json();
    const collection = database.collection("tasks");
    const docs = await collection.find(taskToComplete).toArray();
    expect(docs.length).toBe(1);
    const task = docs[0];
    expect(task.completed).toBeTruthy();
    expect(json).toEqual({ ...task, _id: task._id.toString() });
  });

  it("should postpone a task", async () => {
    const taskToPostpone = { title: "title1", content: "content1" };
    const r1 = await database.collection("tasks").insertOne(taskToPostpone);
    const taskId = r1.ops[0]._id;

    const generated_date = new Date();
    generated_date.setTime(generated_date.getTime() + 3 * 60 * 60 * 1000);
    const response = await fetch(
      serverPath(`/tasks/${taskId}/actions/postpone`),
      {
        method: "PATCH",
        headers: {
          ...jsonHeader,
          ...authHeaders
        },
        body: JSON.stringify({ postpone_date: generated_date.toISOString() })
      }
    );
    expect(response.ok).toBeTruthy();

    const json = await response.json();
    const collection = database.collection("tasks");
    const docs = await collection.find(taskToPostpone).toArray();
    expect(docs.length).toBe(1);
    const task = docs[0];
    expect(task.postpone_date).toBe(generated_date.getTime());
    expect(json).toEqual({ ...task, _id: task._id.toString() });
  });
});
