import { ref, type Ref } from "vue";
import type IUserDto from "./interfaces/IUserDto";

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URL_USER = `${BASE_DOMAIN}/api/users`;

class UserService {
  private user: Ref<IUserDto>;
  private users: Ref<Array<IUserDto>>;

  constructor() {
    this.user = ref<IUserDto>({});
    this.users = ref<Array<IUserDto>>([]);
  }

  getUser(): Ref<IUserDto> {
    return this.user;
  }

  getUsers(): Ref<Array<IUserDto>> {
    return this.users;
  }

  async fetchAll(): Promise<void> {}
}
export default UserService;
