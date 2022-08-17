const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const PERSON_TYPE_URL = `${BASE_DOMAIN}/api/Persons/types`;
const PERSON_LOOKUP_URL = `${BASE_DOMAIN}/api/Persons/lookup`;

export default {
  async GetPersonTypes() {
    return await this.loadDataFetch(`${PERSON_TYPE_URL}`).then((data) => data);
  },

  async GetPersonLookUp() {
    return await this.loadDataFetch(`${PERSON_LOOKUP_URL}`).then(
      (data) => data
    );
  },

  async loadDataFetch(url) {
    return await fetch(`${url}`)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then((data) => {
        console.log(`repository - loadDataFetch -> ${url}`, data.data.data);
        return data.data.data;
      });
  },

  checkStatus(response) {
    console.log("checkStatus", response);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },

  parseJSON(response) {
    console.log("parseJSON", response);
    return response.json();
  },
};
