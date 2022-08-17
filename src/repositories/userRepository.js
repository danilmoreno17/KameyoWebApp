import repository from "./Repository";

const resource = "/api/users";

export default {
  GetWithPagination(payload) {
    return repository.get(`${resource}/paginated`, payload);
  },
  Get(payload) {
    return repository.get(`${resource}`, payload);
  },
  GetAll(payload) {
    return repository.get(`${resource}/all`, payload);
  },
  Create(payload) {
    return repository.post(`${resource}`, payload);
  },
  Update(payload) {
    return repository.put(`${resource}/id`, payload);
  },
  Delete(id) {
    return repository.post(`${resource}/${id}`);
  },
};
