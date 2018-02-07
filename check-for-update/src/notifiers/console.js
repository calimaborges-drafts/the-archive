const notify = data => {
  if (data) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => console.error("\007"), i * 300);
    }
  }
  console.log(data);
};

module.exports = {
  notify
};
