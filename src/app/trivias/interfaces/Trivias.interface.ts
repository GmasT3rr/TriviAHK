export interface Trivia {
  id: number;
  _esBorrado: boolean;
  _nombre: string;
  _fechaCreacion: Date;
  _descripcion: string;
  _creadoPor: CreadoPor | null;
  _preguntas: Pregunta[];
}

export interface CreadoPor {
  id: number;
  _nombre: string;
  _apellido: string;
  _email: string;
  _JWT: string;
}

export interface Pregunta {
  id: number;
  tipoDePregunta: TipoDePregunta;
  _leyenda: string;
  _opciones: Opciones[];
}

export interface Opciones {
  _descripcion: string;
  _esCorrecta: boolean;
  _fueSeleccionada: boolean;
  id: number;
}

export enum TipoDePregunta {
  MultipleChoice = 'multiple_choice',
  SingleChoice = 'single_choice',
  Votacion = 'votacion'
}
