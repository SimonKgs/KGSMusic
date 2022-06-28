/* eslint-disable prettier/prettier */
//    helper para peticiones delete
export default function fetchDelete(url: string, data = undefined) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
