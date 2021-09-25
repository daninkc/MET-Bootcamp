export default async function post(url, item) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: item,
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
  