export const getUsers = async () => {
  return await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};
