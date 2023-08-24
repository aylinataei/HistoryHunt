import axios, { Axios } from "axios"

const API_KEY = "AIzaSyCOnhJveJX5FD1PEFSulmhz5NjQ30slw2Q"

const authenticate = async (mode, email, password) => {
  const resp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  )
  console.log("RESP", resp.data)
  return resp.data.idToken;
}

export const signupUser = async (email, password,) => {
  return await authenticate("signUp", email, password)

}

export const signinUser = async (email, password,) => {
  return await authenticate("signInWithPassword", email, password)
}

export const updateUser = async (displayName, idToken) => {
  const resp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
    {
      displayName,
      idToken,
      returnSecureToken: true,
    }
  )
  console.log("RESP", resp.data);
  return resp.data.idToken;
}


const rootUrl = ('https://history-hunt-fdd3a-default-rtdb.europe-west1.firebasedatabase.app')


export const storeHunt = (hunt) => {
  axios.post(`${rootUrl}/hunt.json`, hunt)
}
export const storeUser = (userData) => {
  axios.post(`${rootUrl}/users.json`, userData)
}
export const getUser = async () => {
  const resp = await axios.get(`${rootUrl}/users.json`)
  console.log('resp', resp.data)
  return resp.data;
}

export const getHunt = async () => {
  const resp = await axios.get(`${rootUrl}/hunt.json`)
  console.log('resp', resp.data)
  return resp.data;
}