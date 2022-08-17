import repository from "./Repository";

const resource = "/api/ProductivityParticipationTable";

export default {
  GetWithFilterSubidiary(payload, subsidiaryId) {
    const params = Object.keys(payload)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
      )
      .join("&");
    return repository.get(`${resource}/filter/${subsidiaryId}?${params}`);
  },
  GetWithFilterTaskActivities(employeeId, year, month, payload) {
    const params = Object.keys(payload)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
      )
      .join("&");
    return repository.get(`${resource}/taskActivitiesDetails/filter/${employeeId}/${year}/${month}/?${params}`);
  },
  GetWithPagination(payload) {
    return repository.get(`${resource}/paginated`, payload);
  },
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