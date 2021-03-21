const fetchData = async (targetUrl, sentData) => {
  const response = sentData ?
    await fetch(targetUrl, {method: 'POST', body: sentData}) :
    await fetch(targetUrl);
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`${response.status} ${response.statusText}`);
}

export {fetchData};
