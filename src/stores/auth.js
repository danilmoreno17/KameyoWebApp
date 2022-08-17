import { defineStore } from "pinia";

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URL = `${BASE_DOMAIN}/api/Authentication`;

function checkStatus(response) {
  console.log("checkStatus", response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    // var error = new Error(response.statusText);
    // error.response = response;
    // throw error;
    throw response.statusText;
  }
}

function parseJSON(response) {
  console.log("parseJSON", response);
  return response.json();
}

export const authUserStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    authenticated: false,
  }),

  getters: {
    getAuthenticatedUser: (state) => {
      return state.user
        ? state.user
        : (state.user = JSON.parse(localStorage.getItem("user")));
    },
    getUserType: (state) => {
      console.log(state);
      return state.user
        ? state.user
        : (state.user = JSON.parse(localStorage.getItem("user")));
    },

    isAuthenticated: (state) => {
      const localStore = JSON.parse(localStorage.getItem("authenticated"));
      let result = state.authenticated;
      if (localStore) result = localStore;
      return result;
    },
  },
  actions: {
    async signIn(params) {
      return await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          console.log(`signIn -> ${URL}`, data);
          return data;
        });
    },

    async signOut() {
      // try {
      //   await Auth.signOut();
      // } catch (err) {
      //   logger.error("error during sign out: {}", err);
      // }

      this.user = null;
      this.authenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("authenticated");
    },
  },
});
