import { getJwt, loggedInUser } from "../Utils/utils";

const baseUrl = `http://localhost:9191/v1`;
const nutritionixUrl = `https://trackapi.nutritionix.com/v2`;
const nutritionixAppkey = `69defc4e806c29ecd199447885a8e5b9`;
const nutritionixAppId = `79d91b32`;

export function getAuthHeader() {
  const jwt = getJwt().jwt;
  return `Bearer ${jwt}`
}

export async function userLogin(userName: string, password: string) {
  const response = await fetch(`${baseUrl}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: userName,
      password: password
    }),
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function checkUserExist(userId: number) {
  const response = await fetch(`${baseUrl}/user/get-by-id/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    }
  });

  return response.ok;
}

export async function adminLogin(userName: string, password: string) {
  const response = await fetch(`${baseUrl}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: userName,
      password: password
    }),
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function getEntries(date1: string, date2: string) {
  const userId = loggedInUser().id;

  const response = await fetch(`${baseUrl}/entry/get-by-user-id/${userId}?from=${date1}&to=${date2}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    }
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function getAllEntries() {
  const response = await fetch(`${baseUrl}/entry/get-all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    }
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function getAggEntries() {
  const userId = loggedInUser().id;

  const response = await fetch(`${baseUrl}/entry/get-agg-entries/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    }
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function createEntry(entry: any) {
  const response = await fetch(`${baseUrl}/entry/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    },
    body: JSON.stringify(entry),
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function updateEntry(entry: any, id: number) {
  const response = await fetch(`${baseUrl}/entry/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    },
    body: JSON.stringify(entry),
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function deleteEntry(id: number) {
  const response = await fetch(`${baseUrl}/entry/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    }
  });

  return response.ok;
}

export async function getReportSummary(today: string) {
  const response = await fetch(`${baseUrl}/entry/get-report-summary?today=${today}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    }
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function getAdmin(userName: string, password: string) {
  const response = await fetch(`${baseUrl}/admin/logged-in-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    },
    body: JSON.stringify({
      name: userName,
      password: password
    }),
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function getUser(userName: string, password: string) {
  const response = await fetch(`${baseUrl}/user/logged-in-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": getAuthHeader()
    },
    body: JSON.stringify({
      name: userName,
      password: password
    }),
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function getCalorieFromNutritionix(query: string) {
  const response = await fetch(`${nutritionixUrl}/natural/nutrients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": nutritionixAppId,
      "x-app-key": nutritionixAppkey,
      "x-remote-user-id": "0"
    },
    body: JSON.stringify({
      query: query
    }),
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function getAutoCompleteFromNutritionix(query: string) {
  const response = await fetch(`${nutritionixUrl}/search/instant?query=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": nutritionixAppId,
      "x-app-key": nutritionixAppkey,
      "x-remote-user-id": "0"
    }
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}
