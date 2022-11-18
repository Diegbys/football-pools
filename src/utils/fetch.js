export async function Fetch(method, url, body = null) {
  console.log(body);
  return await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body,
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
}
