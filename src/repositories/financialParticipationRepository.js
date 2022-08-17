import repository from "./Repository";

const resource = "/api/FinancialParticipation";

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
  GetWithFilterTaskActivities(financialParticipationId,employeeId, year, month, payload) {
    const params = Object.keys(payload)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
      )
      .join("&");
    //return repository.get(`${resource}/taskActivitiesDetails/filter/${employeeId}/${year}/${month}/?${params}`);
    return repository.get(`${resource}/taskActivitiesDetails/filter/${financialParticipationId}/?${params}`);
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
  GetType(id) {
    const catalog = [
      { id: "A", value: "Movimiento" },
      { id: "D", value: "Directa" },
      { id: "I", value: "Indirecta" },
      { id: "P", value: "Directa por Participación" },
    ];
    let object = catalog.find(o => o.id === id);
    if (object == null)
      return { id: "O", value: "Otro" }
    return object;
    ;
  },
  GetStatus(id) {
    const catalog = [
      { id: "G", value: "Generado" },
      { id: "A", value: "Aprobado" },
      { id: "R", value: "Rechazado" },
      { id: "P", value: "Pagado" },
    ];
    let object = catalog.find(o => o.id === id);
    if (object == null)
      return { id: "O", value: "Otro" }
    return object;
    ;
  },
};