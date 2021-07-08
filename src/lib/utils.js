import axios from "axios"

export const callApi = async (path, method, body) => {
  try {
    const response = await axios({
      method,
      headers: {
        "content-type": "application/json"
      },
      url: path,
      baseURL: " https://api.openweathermap.org",
      data: JSON.stringify(body)
    })
    return response.data;
  } catch (err) {
    console.log(err.response)
    return { isError: true, ...err.response }
  }
}

export const setArrayCookie = (name, arr) => {
  const json_str = JSON.stringify(arr);
  window.localStorage.setItem(name, json_str)
}

export const getArrayCookie = (name) => {
  let json_str = window.localStorage.getItem(name)
  if (!json_str) return null
  return JSON.parse(json_str);
}