import axios from "axios";
import { protectedResources, getAccessToken } from "../auth";

const url = protectedResources.apiUser.endpoint;

export async function loginCheck(token) {
    var response = await axios.get(url + "login", {
        headers: { Authorization: `Bearer ${await getBearer()}` },
      });
    return response.data;
}

export async function getUser(token) {
  var response = await axios.get(url + "me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function checkUser(token) {
  var response = await axios.get(url + "login/check", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function getBearer(){
    let AuthObject = await getAccessToken();
    return AuthObject.accessToken;
}
