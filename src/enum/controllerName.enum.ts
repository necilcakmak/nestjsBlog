export enum ControllerEnum {
  //burada butun controller routelarini vermemiz gererek
  auth = 1,
  article,
  category,
  comment,
  user,
}

export enum RoleType {
  Select = 1,
  Update,
  Delete,
  Insert,
}

export enum RoleTypeConverter {
  //controllerlarda ki fonksiyonlarimizin get(select),post(insert),update,delete gibi methodlarini belirtiyoruz
  getall = RoleType.Select,
  getbyid = RoleType.Select,
  add = RoleType.Insert,
  deleteEntities = RoleType.Delete,
  update = RoleType.Update,
  delete = RoleType.Delete,
  deletebyid = RoleType.Delete,
  deleterange = RoleType.Delete,
  getAllFilter = RoleType.Select,
}
