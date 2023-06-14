import { Role } from "../enums/Role";

export interface Utenti {
  id? : number;
  nome_utente : string;
  salt : string;
  password : string;
  modificato_da : number;
  modificato_il : string;
  creato_il : string;
  creato_da : number;
  ultima_modifica_password : string;
  nome : string;
  cognome : string;
  email : string;
  cambio_password : boolean;
  ultimo_accesso : string;
  role : Role;
}
