export interface Resultado {
  sesion: number;
  usuario: Usuario;
  puntajeTotal: number;
}

export interface Usuario {
  nombre: string;
  apellido: string;
}

export interface UsuariosPuntuacion {
  nombre: string;
  puntaje: number;
}

export interface OpcionesCorrectas {
  _descripcion: string;
  _esCorrecta: boolean;
  id: number;
  _fueSeleccionada: boolean;
}
