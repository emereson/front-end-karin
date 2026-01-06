export interface Login {
  password: string;
  email: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  fecha_nacimiento: string;
  password: string;
  sexo: string;
  telefono: string;
  role: string;
  newpassword: string;
}
