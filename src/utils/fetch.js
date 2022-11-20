export async function Fetch(method, url, body = null) {
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
