import repository from "./Repository";

const resource = "/api/employeeskillabilities";

export default {
  Get(field, value) {
    return repository.get(`${resource}?Field=${field}&Value=${value}`);
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