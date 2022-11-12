export interface Partida {
  id: number;
  puntuacion: number;
  trivia: Trivia;
}

export interface Trivia {
  id: number;
  _esBorrado: boolean;
  _nombre: string;
  _fechaCreacion: Date;
  _descripcion: string;
}
