export const apiUrl = "http://127.0.0.1:8000/api/";
export const domain = "http://127.0.0.1:8000";

// export const apiUrl = "/api/";
// export const domain = "";

const token = window.localStorage.getItem("token");

export const options = {
  headers: {
    Authorization: `token ${token}`,
  },
};
export const headersData = {
  "Content-Type": "application/json",
  Authorization: `token ${token}`,
};
