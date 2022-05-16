export function formatDate(d: Date) {
  return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear();
}

export function formatTime(d: Date) {
  return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}

export function getCellClassRules() {
  const calorieLimit = loggedInUser().dailyCalorieLimit as number;
  return {
    "rag-green": `x < ${calorieLimit - 100}`,
    "rag-amber": `x >= ${calorieLimit - 100} && x < ${calorieLimit + 100}`,
    "rag-red": `x >= ${calorieLimit + 100}`,
  };
}

export function loggedInUser() {
  return JSON.parse(localStorage.getItem("user") as any)
}

export function loggedInAdmin() {
  return JSON.parse(localStorage.getItem("admin") as any)
}

export function logoutAdmin() {
  localStorage.removeItem('admin')
}
