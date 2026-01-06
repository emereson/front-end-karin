export interface Archivo {
  id: string | number;
  classroom_id: string | number;
  name_archivo: string;
  archivo_url: string;
}

export interface FormArchivo {
  material_apoyo?: FileList | null;
  formato?: FileList | null;
  documento?: FileList | null;
}

export interface FormFoda {
  id?: string | number;
  estado: string;
  colaboradora: string;
  nivel: string;
  detalle: string;
  caduca: string;
  fecha_ingreso: string;
  tipo_documento: string;
}

export interface CambiosFoda {
  documento: string;
  id: string | number;
  revisor?: string;
  comentario?: string;
  createdAt?: string;
  estado?: string;
}

export interface Nota {
  id?: string | number;

  createdAt?: string;
  nota?: string;
}
export interface Foda {
  id: string | number;
  estado: string;
  colaboradora: string;
  nivel: string;
  detalle: string;
  caduca: string;
  fecha_ingreso: string;
  tipo_documento: string;
  documento: string | null;
  cambiosFoda?: CambiosFoda[];
  notas?: Nota[];
}
