import axios from "axios";

export const apiBase = import.meta.env.VITE_API_URL;

console.log("apiBase is ########################");
console.log(apiBase);

export async function query<T = unknown>(
  method: "get" | "post",
  path: string,
  payload?: unknown,
): Promise<T> {
  // console.log('query() called with')
  // console.log(`method ${method}`)
  // console.log(`path ${path}`)
  // console.log('and payload')
  // console.log(payload)

  const url = `${apiBase}${path}`;

  const response =
    method === "get"
      ? await axios.get<T>(url)
      : await axios.post<T>(url, payload);

  console.log("query returns response.data -> see below");
  console.log(response.data);

  return response.data;
}
