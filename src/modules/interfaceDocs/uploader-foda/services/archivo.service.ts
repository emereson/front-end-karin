import axios from "axios";
import type {
  CambiosFoda,
  FormFoda,
  Nota,
} from "../../../../type/archivo.type";

const urlApi = import.meta.env.VITE_URL_API;

export async function getMaterialApoyo(id: number) {
  try {
    const res = await axios.get(`${urlApi}/material-apoyo/all/${id}`);

    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function postMaterialApoyo(data: FormData, id: number) {
  try {
    const res = await axios.post(`${urlApi}/material-apoyo/${id}`, data);
    return res.data.archivo; // Retorna los datos del aula agregada
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}

export async function getFormato(id: number) {
  try {
    const res = await axios.get(`${urlApi}/formato/all/${id}`);

    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function postFormato(data: FormData, id: number) {
  try {
    const res = await axios.post(`${urlApi}/formato/${id}`, data);
    return res.data.archivo; // Retorna los datos del aula agregada
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}

export async function getFoda(id: number) {
  try {
    const res = await axios.get(`${urlApi}/foda/all/${id}`);

    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getFodaId(id: string | number) {
  try {
    const res = await axios.get(`${urlApi}/foda/${id}`);

    return res.data;
  } catch (err) {
    throw err;
  }
}
export async function postFoda(data: FormFoda, id: number) {
  try {
    const res = await axios.post(`${urlApi}/foda/${id}`, data);
    return res.data; // Retorna los datos del aula agregada
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}

export async function postFodaNota(data: Nota, id: string | number) {
  try {
    const res = await axios.post(`${urlApi}/foda-nota/${id}`, data);
    return res.data; // Retorna los datos del aula agregada
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}

export async function deleteFoda(id: string | number) {
  try {
    const res = await axios.delete(`${urlApi}/foda/${id}`);

    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function cargarDocumentoFoda(data: FormData, id: string | number) {
  try {
    const res = await axios.post(`${urlApi}/foda/documento/${id}`, data);
    return res.data; // Retorna los datos del aula agregada
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}

export async function validarFoda(id: string | number, data: CambiosFoda) {
  try {
    const res = await axios.post(`${urlApi}/foda/validar/${id}`, data);
    return res.data; // Retorna los datos del aula agregada
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}

export async function rechazarFoda(id: string | number, data: CambiosFoda) {
  try {
    const res = await axios.post(`${urlApi}/foda/rechazar/${id}`, data);
    return res.data; // Retorna los datos del aula agregada
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}
