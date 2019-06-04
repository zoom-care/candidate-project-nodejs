import { Address } from "./address";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phoneNumbers: string[];
  website: string;
}
