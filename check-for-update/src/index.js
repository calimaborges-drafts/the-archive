const { notify } = require("./notifiers/mailgun");
const anac = require("./drivers/anac");
const dodf = require("./drivers/dodf");

const check_for_update = ({ fetch_content, check_for_news }) => async () => {
  console.log("Fetching content...");
  const body = await fetch_content();
  console.log("Checking for news...");
  const data = await check_for_news(body);
  if (data) {
    console.log("NEWS!!");
    notify(data);
  } else {
    console.log("Nothing new :-(");
  }
};

const VERIFY_INTERVAL = 10 * 1000;
const interval = check_for_update(dodf);

interval();
setInterval(interval, VERIFY_INTERVAL);
