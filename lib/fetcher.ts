/* eslint-disable prettier/prettier */

//    helper para realizar los fetch solo para post y get
export default function fetcher(url: string, data = undefined) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status > 399 && res.status < 200) {
        throw new Error();
      }
      return res.json();
    })
    .catch((e) => {
      throw e;
    });
}
