const core = require('@actions/core');
const request = require('superagent');

(async () => {
  const url = core.getInput('url');
  let json = core.getInput('json');

  if (!url) {
    core.setFailed(`Missing required parameter: url`);
    return;
  }

  // If not specified or an empty string is given, still proceed.
  if (!json) {
    json = {};
  }

  // Check if JSON is valid and provide as an object to Superagent.
  try {
    obj = JSON.parse(json);
  } catch (err) {
    core.setFailed(`Invalid json:`, err);
    return;
  }

  try {
    const res = await request
      .post(url)
      .send(obj);
    if (res.status !== 200) {
      core.setFailed(`Webhook response code was: ${res.status}`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
