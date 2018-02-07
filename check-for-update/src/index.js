const anac = require("./drivers/anac");
const { notify } = require("./notifiers/console");

const check_for_update = ({ fetch_content, check_for_news }) => async () => {
  console.log("Fetching content...");
  const body = await fetch_content();
  console.log("Checking for news...");
  const data = await check_for_news(body);
  notify(data);
};

const VERIFY_INTERVAL = 5 * 1000;
setInterval(check_for_update(anac), VERIFY_INTERVAL);
