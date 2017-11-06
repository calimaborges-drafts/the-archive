import { bool, string, instanceOf } from "prop-types";
import moment from "moment";

export const createTask = () => {
  return {
    title: "",
    content: ""
  };
};

export const taskShape = {
  completed: bool,
  content: string,
  postpone_date: instanceOf(moment),
  title: string,
  userid: string,
  _id: string
};
