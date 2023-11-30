import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  email: string = '';
  contrasena: string = '';
  primerNombre: string = '';
  segundoNombre: string = '';
  apellidos: string = '';
  fechaNacimiento: string = '';
  sexo: string = '';
  errorMessage: string = '';

  regiones: Region[] = [];
  comunas: Comuna[] = [];
  regionSeleccionado: number = 0;
  comunaSeleccionada: number = 0;

  constructor(
    private auth: AngularFireAuth,
    private helper: HelperService,
    private router: Router,
    private storageService: StorageService,
    private locationService: LocationService,
    private alertController: AlertController

  ) {}

  ngOnInit() {
    this.viewUser();
    this.cargarRegion();
  }

  async cargarRegion() {
    try {
      const req = await this.locationService.getRegion();
      this.regiones = req.data;
      console.log("REGION", this.regiones);
    } catch (error) {
      console.error('Error al cargar regiones:', error);
      this.helper.showAlert('Error al cargar regiones', 'Error');
    }
  }

  async viewUser() {
    try {
      console.log("USUARIOS REGISTRADOS", await this.storageService.obtenerUsuario());
    } catch (error) {
      console.error('Error al cargar usuarios registrados:', error);
      this.helper.showAlert('Error al cargar usuarios registrados', 'Error');
    }
  }

  async cargarComuna() {
    try {
      if (this.regionSeleccionado === 0) {
        // Evitar realizar la solicitud si no se ha seleccionado una región
        this.comunas = [];
        return;
      }
      const req = await this.locationService.getComuna(this.regionSeleccionado);
      this.comunas = req.data;
    } catch (error) {
      console.error('Error al cargar comunas:', error);
      this.helper.showAlert('Error al cargar comunas', 'Error');
    }
  }

  async registrarse() {
    if (!this.email || !this.contrasena || !this.primerNombre || !this.apellidos) {
      this.helper.showAlert('Por favor, complete todos los campos', 'Error');
      return;
    }

    // Verifica si el correo electrónico ya está en uso antes de intentar registrarse
    try {
      const existingUser = await this.auth.fetchSignInMethodsForEmail(this.email);
      if (existingUser && existingUser.length > 0) {
        // Muestra un mensaje de alerta si el correo ya está registrado
        this.mostrarAlertaCorreoExistente();
      } else {
        const request = await this.auth.createUserWithEmailAndPassword(this.email, this.contrasena);
        const user = {
          email: this.email,
          contrasena: this.contrasena,
          primerNombre: this.primerNombre,
          segundoNombre: this.segundoNombre,
          apellidos: this.apellidos,
          fechaNacimiento: this.fechaNacimiento,
          sexo: this.sexo,
        };
        await this.storageService.agregarUsuario(user);

        await this.helper.showAlert('Usuario registrado correctamente', 'Información');
        await this.router.navigateByUrl('login');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      if (error.code === 'auth/invalid-email') {
        this.helper.showAlert('Error en el formato del correo', 'Error');
      } else if (error.code === 'auth/weak-password') {
        this.helper.showAlert('La contraseña debe tener al menos 6 caracteres', 'Error');
      } else {
        this.helper.showAlert('Error al registrar el usuario', 'Error');
      }
    }
  }
  
  async mostrarAlertaCorreoExistente() {
    const alert = await this.alertController.create({
      header: 'Correo ya registrado',
      message: 'El correo electrónico ya está registrado por otra cuenta.',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  
}
