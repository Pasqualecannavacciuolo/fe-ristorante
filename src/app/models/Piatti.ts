import { Menu } from "./Menu";

export interface Piatti {
  id?: number,
  nome: string,
  costo: number,
  descrizione: string,
  menu?: Menu
}
