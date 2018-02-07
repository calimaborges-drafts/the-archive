require("dotenv").config();
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const notify = data => {
  mailgun.messages().send(
    {
      ...data,
      from: process.env.MAILGUN_FROM,
      to: process.env.MAILGUN_TO
    },
    function(error, body) {
      if (error) console.error(error);
      if (body) console.log(body);
    }
  );
};

module.exports = { notify };
