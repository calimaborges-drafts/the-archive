const { notify } = require("./notifiers/console");
const anac = require("./drivers/anac");
const dodf = require("./drivers/dodf");

const check_for_update = ({ fetch_content, check_for_news }) => async () => {
  console.log("Fetching content...");
  const body = await fetch_content();
  console.log("Checking for news...");
  const data = await check_for_news(body);
  notify(data);
};

const VERIFY_INTERVAL = 10 * 1000;
const interval = check_for_update(dodf);

interval();
setInterval(interval, VERIFY_INTERVAL);
