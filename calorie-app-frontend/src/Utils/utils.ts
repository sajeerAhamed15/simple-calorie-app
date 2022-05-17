import moment from "moment";
import { checkUserExist } from "../Services/api";

export function formatDate(d: Date) {
  return (
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2) +
    "-" +
    d.getFullYear()
  );
}

export function formatTime(d: Date) {
  return (
    ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
  );
}

export function stringToDate(str: string) {
  return moment(str, "MM-DD-YYYY HH:mm").toDate();
}

export function getCellClassRules() {
  if (!loggedInUser()) return
  const calorieLimit = loggedInUser().dailyCalorieLimit as number;
  return {
    "rag-green": `x < ${calorieLimit - 100}`,
    "rag-amber": `x >= ${calorieLimit - 100} && x < ${calorieLimit + 100}`,
    "rag-red": `x >= ${calorieLimit + 100}`,
  };
}

export function getJwt() {
  return JSON.parse(localStorage.getItem("token") as any);
}

export function loggedInUser() {
  return JSON.parse(localStorage.getItem("user") as any);
}

export function loggedInAdmin() {
  return JSON.parse(localStorage.getItem("admin") as any);
}

export function logoutAdmin() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
}

export function validateInput(
  userId: any,
  date: any,
  time: any,
  foodName: any,
  calories: any
) {
  const _date1 = moment(`${date}`);
  const _date2 = moment(`${time}`);
  if (
    userId !== "" &&
    date !== "" &&
    time !== "" &&
    foodName !== "" &&
    calories !== "" &&
    parseFloat(userId) > 0 &&
    parseFloat(calories) > 0 &&
    _date1.isValid() &&
    _date2.isValid()
  ) {
    return true;
  } else {
    return false;
  }
}

export async function validUserCheck(userId: number) {
  return await checkUserExist(userId);  
}
