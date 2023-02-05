export class User {
    id?:any;
    username?: string;
    email?: string;
    password?: string;
    firstName?:string;
    lastName?: string;
    telephone?: string;
    address?: object;
    roles?: object;
    orders?: object;
    active!: boolean;
  }

