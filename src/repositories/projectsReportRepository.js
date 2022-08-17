import repository from "./Repository";

const resource = "/api/ProjectReport";

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
  GetStatus(id) {
    const catalog = [
      { id: "G", value: "Generado" },
      { id: "C", value: "Enviar a Cliente" },
      { id: "A", value: "Aprobado" },
      { id: "R", value: "Regresar con Observación" },
      { id: "F", value: "Facturado" },
      { id: "P", value: "Pagado" },
    ];
    let object = catalog.find(o => o.id === id);
    if (object == null)
      return { id: "O", value: "Otro" }
    return object;
    ;
  },
};