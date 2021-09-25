export default async function get(url) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const data = await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return data;
}
