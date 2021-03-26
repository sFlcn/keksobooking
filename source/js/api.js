const fetchData = async (targetUrl, options) => {
  const response = await fetch(targetUrl, options);
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`${response.status} ${response.statusText}`);
}

export {fetchData};
