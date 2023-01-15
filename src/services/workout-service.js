import axios from "axios";
import { protectedResources, getAccessToken } from "../auth";

const url = protectedResources.apiWorkout.endpoint;

export async function getWorkouts() {
    var response = await axios.get(url, {
        headers: { Authorization: `Bearer ${await getBearer()}` },
      });
    return response.data;
}

export async function saveWorkout(workout) {
  var response = await axios.post(url, workout, {
    headers: { Authorization: `Bearer ${await getBearer()}` },
  });
  return response.data;
}

async function getBearer(){
    let AuthObject = await getAccessToken();
    return AuthObject.accessToken;
}
