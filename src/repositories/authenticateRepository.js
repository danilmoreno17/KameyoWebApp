import repository from "./Repository";

const resource = "/api/authentication";

export default {
    ValidateUser(mail, rol) {
        console.log(mail, rol);
        return repository.get(`${resource}?mail=${mail}&role=${rol}`);
    },
};
