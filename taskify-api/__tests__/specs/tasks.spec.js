import fetch from "node-fetch";
import HttpStatus from "http-status-codes";
import {
  useServer,
  database,
  serverPath,
  authHeaders,
  userid
} from "../libs/test-helpers.lib";
import { jsonHeader } from "../../src/commons/rest-headers";

useServer();

describe("tasks", () => {
  it("should refuse access to unauthorized user", async () => {
    const response = await fetch(serverPath("/tasks"), {
      method: "GET",
      headers: {
        ...jsonHeader
      }
    });
    expect(response.ok).toBeFalsy();

    const json = await response.json();
    expect(json).toEqual({
      code: HttpStatus.UNAUTHORIZED,
      name: "Unauthorized",
      message: "Unauthorized"
    });
  });

  it("should create a task", async () => {
    const task = { title: "title", content: "content" };
    const response = await fetch(serverPath("/tasks"), {
      method: "POST",
      headers: {
        ...jsonHeader,
        ...authHeaders
      },
      body: JSON.stringify(task)
    });
    expect(response.ok).toBeTruthy();

    const json = await response.json();
    const collection = database.collection("tasks");
    const docs = await collection.find(task).toArray();
    expect(docs.length).toBe(1);
    expect(json).toEqual({
      _id: docs[0]._id.toString(),
      userid: docs[0].userid.toString(),
      ...task
    });
  });

  it("should retrieve tasks", async () => {
    const collection = database.collection("tasks");
    await collection.insertOne({ title: "title1", content: "content1" });
    await collection.insertOne({ title: "title2", content: "content2" });

    const response = await fetch(serverPath("/tasks"), {
      method: "GET",
      headers: {
        ...jsonHeader,
        ...authHeaders
      }
    });
    expect(response.ok).toBeTruthy();

    const json = await response.json();
    expect(json.length).toBe(2);

    const task = json[0];
    expect(task._id).toBeTruthy();
  });

  it("should update tasks", async () => {
    await database
      .collection("tasks")
      .insertOne({ title: "title1", content: "content1" });
    const r2 = await database
      .collection("tasks")
      .insertOne({ title: "title2", content: "content2" });
    const taskToUpdate = {
      title: "title-alterado",
      content: "content-alterado"
    };
    const taskId = r2.ops[0]._id;

    const response = await fetch(serverPath(`/tasks/${taskId}`), {
      method: "PUT",
      headers: {
        ...jsonHeader,
        ...authHeaders
      },
      body: JSON.stringify(taskToUpdate)
    });
    expect(response.ok).toBeTruthy();
    const json = await response.json();
    const task = await database.collection("tasks").findOne(taskId);
    expect(task.title).toBe(taskToUpdate.title);
    expect(task.content).toBe(taskToUpdate.content);
    expect(json).toEqual({
      ...task,
      _id: task._id.toString(),
      userid: task.userid.toString()
    });
  });

  it("should delete task", async () => {
    const taskToDelete = { title: "title2", content: "content2" };
    const collection = database.collection("tasks");
    await collection.insertOne({ title: "title1", content: "content1" });
    const r2 = await collection.insertOne(taskToDelete);
    const taskId = r2.ops[0]._id;

    const response = await fetch(serverPath(`/tasks/${taskId}`), {
      method: "DELETE",
      headers: {
        ...jsonHeader,
        ...authHeaders
      }
    });
    expect(response.ok).toBeTruthy();

    const json = await response.json();
    const task = await database.collection("tasks").findOne(taskId);
    expect(task.deleted_at).toBeTruthy();
    expect(json).toEqual({
      ...task,
      _id: task._id.toString(),
      deleted_at: task.deleted_at.toISOString()
    });
  });

  it("should ignore _id field on create task", async () => {
    const response = await fetch(serverPath("/tasks"), {
      method: "POST",
      headers: {
        ...jsonHeader,
        ...authHeaders
      },
      body: JSON.stringify({
        _id: "fake-id",
        title: "title1",
        content: "content1"
      })
    });
    expect(response.ok).toBeTruthy();

    const task = await database.collection("tasks").findOne({ _id: "fake-id" });
    expect(task).toBeFalsy();
  });

  it("should ignore _id field on update task", async () => {
    const r1 = await database
      .collection("tasks")
      .insertOne({ title: "title1", content: "content1" });

    const response = await fetch(serverPath(`/tasks/${r1.ops[0]._id}`), {
      method: "PUT",
      headers: {
        ...jsonHeader,
        ...authHeaders
      },
      body: JSON.stringify({
        _id: "fake-id",
        title: "title-alterado",
        content: "content-alterado"
      })
    });
    expect(response.ok).toBeTruthy();

    const task = await database.collection("tasks").findOne({ _id: "fake-id" });
    expect(task).toBeFalsy();
  });

  it("should retrieve task postpone date in iso format", async () => {
    const generated_date = new Date();
    generated_date.setTime(generated_date.getTime() + 3 * 60 * 60 * 1000);

    await database.collection("tasks").insertOne({
      title: "title1",
      content: "content1",
      postpone_date: generated_date
    });

    const response = await fetch(serverPath("/tasks"), {
      method: "GET",
      headers: {
        ...jsonHeader,
        ...authHeaders
      }
    });
    expect(response.ok).toBeTruthy();

    const json = await response.json();
    const task = json[0];
    expect(task.postpone_date).toBe(generated_date.toISOString());
  });

  it("created task should belong to logged in user only", async () => {
    const response = await fetch(serverPath("/tasks"), {
      method: "POST",
      headers: {
        ...jsonHeader,
        ...authHeaders
      },
      body: JSON.stringify({ title: "title", content: "content" })
    });
    expect(response.ok).toBeTruthy();

    const collection = database.collection("tasks");
    const docs = await collection
      .find({ title: "title", content: "content", userid })
      .toArray();
    expect(docs.length).toBe(1);
  });

  it("edited task should belong to logged in user only", async () => {
    await database
      .collection("tasks")
      .insertOne({ title: "title1", content: "content1" });
    const r2 = await database
      .collection("tasks")
      .insertOne({ title: "title2", content: "content2" });

    const response = await fetch(serverPath(`/tasks/${r2.ops[0]._id}`), {
      method: "PUT",
      headers: {
        ...jsonHeader,
        ...authHeaders
      },
      body: JSON.stringify({
        title: "title-alterado",
        content: "content-alterado"
      })
    });
    expect(response.ok).toBeTruthy();

    const docs = await database
      .collection("tasks")
      .find({ title: "title-alterado", content: "content-alterado", userid })
      .toArray();
    expect(docs.length).toBe(1);
  });

  it("should retrieve logged user's task only", async () => {
    const collection = database.collection("tasks");
    await collection.insertOne({
      title: "title1",
      content: "content1",
      userid
    });
    await collection.insertOne({
      title: "title2",
      content: "content2",
      userid: "other-user-id"
    });

    const response = await fetch(serverPath("/tasks"), {
      method: "GET",
      headers: {
        ...jsonHeader,
        ...authHeaders
      }
    });
    expect(response.ok).toBeTruthy();

    const json = await response.json();
    expect(json.length).toBe(1);
  });

  it("should retrieve only non deleted tasks", async () => {
    const collection = database.collection("tasks");
    await collection.insertOne({
      title: "title1",
      content: "content1",
      deleted_at: new Date()
    });
    await collection.insertOne({ title: "title2", content: "content2" });

    const response = await fetch(serverPath("/tasks"), {
      method: "GET",
      headers: {
        ...jsonHeader,
        ...authHeaders
      }
    });
    expect(response.ok).toBeTruthy();

    const json = await response.json();
    expect(json.length).toBe(1);
  });
});
