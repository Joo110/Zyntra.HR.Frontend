import Cookies from "js-cookie";

export const authCookies = {
  getToken: () => Cookies.get("token"),
  getRole: () => Cookies.get("role"),

  setToken: (token: string) =>
    Cookies.set("token", token, { expires: 7, secure: true, sameSite: "strict" }),

  removeToken: () => Cookies.remove("token"),

  clear: () => {
    Cookies.remove("token");
    Cookies.remove("role");
  },
};