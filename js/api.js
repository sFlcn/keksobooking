function getData(targetUrl, onSuccess, onFail) {
  fetch(targetUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onFail(err);
    });
}

export {getData};
