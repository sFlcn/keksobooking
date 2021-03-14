const getData = (targetUrl, onSuccess, onFail) => {
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

const sendData = (sentData, targetUrl, onSuccess, onFail) => {
  fetch(
    targetUrl,
    {
      method: 'POST',
      body: sentData,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch((err) => {
      onFail(err);
    });
}

export {getData, sendData};
