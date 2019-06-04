import { Geo } from "./geo";

export interface Address {
  street: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
