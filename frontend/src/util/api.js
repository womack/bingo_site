const api_url = "http://localhost:5000/api";

const get = endpoint => {
  return new Promise((resolve, reject) => {
    fetch(`${api_url}/${endpoint}`)
      .then(res => {console.log(res); return res.json()})
      .then(resolve)
      .catch(reject);
  });
};

exports.get = get;
