import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/storage.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private storageService: StorageService,
    private helperService: HelperService
  ) {}

  async sendResetCode() {
    try {
      const userExists = await this.checkUserExists(this.email);

      if (userExists) {
        await this.afAuth.sendPasswordResetEmail(this.email);
        await this.helperService.mostrarMensaje('Se ha enviado un correo con el código de restablecimiento.');
      } else {
        await this.helperService.mostrarMensaje('Debe ingresar un correo válido.');
      }
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento', error);
      await this.helperService.mostrarMensaje('Hubo un problema. Inténtalo de nuevo más tarde.');
    }
  }

  async checkUserExists(email: string): Promise<boolean> {
    const usuarios = await this.storageService.obtenerUsuario();
    return usuarios.some((usuario) => usuario.email === email);
  }

  ngOnInit() {}
}