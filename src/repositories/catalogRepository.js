import repository from "./Repository";

const resource = "/api/catalogs";

export default {
  GetWithFilter(payload) {
    const params = Object.keys(payload)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
      )
      .join("&");
    return repository.get(`${resource}/filter?${params}`);
  },
  Get(field, value) {
    return repository.get(`${resource}?Field=${field}&Value=${value}`);
  },
  GetPaginated(payload) {
    return repository.get(`${resource}`, payload);
  },
  Create(payload) {
    return repository.post(`${resource}`, payload);
  },
  Update(payload) {
    return repository.put(`${resource}`, payload);
  },
  Delete(id) {
    return repository.delete(`${resource}/${id}`);
  },
};
