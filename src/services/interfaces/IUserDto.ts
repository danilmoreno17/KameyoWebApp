import type IUserRolesDto from "@/services/interfaces/IUserRolesDto";

interface IUserDto {
  id?: string;
  email?: string;
  personTypeId?: string;
  personId?: string;
  emailConfirmed?: string;
  UserRoles?: Array<IUserRolesDto>;
}

export default IUserDto;
