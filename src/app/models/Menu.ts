import { Piatti } from "./Piatti";

export interface Menu {
  id?: number,
  nome: string,
  attivo: boolean,
  seleziona_piatti? : Array<Piatti>
  lista_piatti? : Array<Piatti>
}
