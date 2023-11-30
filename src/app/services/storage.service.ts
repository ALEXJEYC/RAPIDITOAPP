import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface Usuario {
  email: string;
  contrasena: string;
  primerNombre?: string;
  segundoNombre?: string;
  apellidos?: string;
  fechaNacimiento?: string; 
  sexo?: string;
  vehiculo?: Vehiculo;
}


export interface StorageData {
  usuarios: Usuario[];
}

export interface Vehiculo {
  modeloVehiculo: string;
  patente: string;
  anio: number;
  color: string;
  marca: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageUsuario = 'usuarioData';
  public userCorreo: string = '';

  constructor() {}

  async getItem<T>(llave: string): Promise<T | null> {
    try {
      const result = await Preferences.get({ key: llave });
      return result.value as T;
    } catch (error) {
      console.error('Error al obtener el valor de la llave', llave, error);
      return null;
    }
  }

  async setItem(llave: string, valor: string): Promise<void> {
    try {
      await Preferences.set({ key: llave, value: valor });
    } catch (error) {
      console.error('Error al establecer el valor de la llave', llave, error);
    }
  }

  async obtenerUsuario(): Promise<Usuario[]> {
    const storageData = await this.getItem<string>(this.storageUsuario);
    if (storageData === null) {
      return [];
    }

    const parsedData = JSON.parse(storageData) as StorageData;
    return parsedData.usuarios || [];
  }

  async agregarUsuario(user: Usuario): Promise<void> {
    const usuarios = await this.obtenerUsuario();
    const usuariosActualizados = [...usuarios, user];

    try {
      await this.setItem(this.storageUsuario, JSON.stringify({ usuarios: usuariosActualizados }));
    } catch (error) {
      console.error('Error al agregar usuario', error);
    }
  }
async obtenerVehiculo(correo: string): Promise<Vehiculo | null> {
    const usuarios = await this.obtenerUsuario();
    const usuario = usuarios.find((u) => u.email === correo);

    return usuario?.vehiculo || null;
  }

  async agregarVehiculo(correo: string, vehiculo: Vehiculo): Promise<void> {
    const usuarios = await this.obtenerUsuario();
    const usuarioIndex = usuarios.findIndex((u) => u.email === correo);

    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].vehiculo = vehiculo;

      try {
        await this.setItem(this.storageUsuario, JSON.stringify({ usuarios }));
      } catch (error) {
        console.error('Error al agregar vehículo', error);
      }
    }
  }
}

