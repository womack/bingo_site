const api_url = "http://localhost:5000/api";

const get = endpoint => {
  return new Promise((resolve, reject) => {
    fetch(`${api_url}/${endpoint}`)
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
  });
};

const submitTile = (sheetId,boss_name, submission) => {
  return new Promise((resolve, reject) => {
    fetch(`${api_url}/addSubmission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: sheetId,
        boss_name,
        submission
      })
    })
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
  });
};

exports.get = get;
exports.submitTile = submitTile;
