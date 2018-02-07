const env = require("../../../secrets/mailgun");

const mailgun = require("mailgun-js")({
  apiKey: env.MAILGUN_API_KEY,
  domain: env.MAILGUN_DOMAIN
});

const notify = data => {
  mailgun.messages().send(
    {
      ...data,
      from: env.MAILGUN_FROM,
      to: env.MAILGUN_TO_NOTIFY
    },
    function(error, body) {
      if (error) console.error(error);
      if (body) console.log(body);
    }
  );
};

module.exports = { notify };
