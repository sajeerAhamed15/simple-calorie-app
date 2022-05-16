import { loggedInUser } from "../Utils/utils";

const baseUrl = `http://localhost:9191/v1`;

export function getAuthHeader() {
  const user = loggedInUser()
  return `Bearer ${user.name} ${user.password}`
}

export async function userLogin(userName: string) {
  const response = await fetch(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: userName
    }),
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson
  }
}

export async function adminLogin(userName: string) {
  const response = await fetch(`${baseUrl}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: userName
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
