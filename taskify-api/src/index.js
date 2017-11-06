import mongodb from "mongodb";
import winston from "winston";
import Server from "./server";

const main = async () => {
  const mongoUrl =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskify";
  const port = process.env.PORT || 1337;
  const MongoClient = mongodb.MongoClient;
  const database = await MongoClient.connect(mongoUrl);
  const server = new Server(port, database, mongodb.ObjectID);
  await server.start();
  winston.info(`**** Server started on port ${port} *****`);
};

main().catch(error => winston.error("error:", error));
