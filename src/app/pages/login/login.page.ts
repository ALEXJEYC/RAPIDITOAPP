import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = "";
  contrasena:string = "";

  constructor(
              private router:Router,
              private helperService:HelperService,
              private storage:StorageService,
              private auth:AngularFireAuth,
              private afAuth: AngularFireAuth
              ) { }
  firebaseSvc = inject (FirebaseService)
  ngOnInit() {
  }
  async forgotPassword() {
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      // Aquí rediriges a la página que ayude a recuperar la contraseña
      // Ejemplo: this.router.navigateByUrl('/recuperar-contrasena');
    } catch (error) {
      console.error('Error al enviar el correo de recuperación de contraseña', error);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
  }


  async login() {
    const loader = await this.helperService.showLoading("Cargando");
  
    if (!this.email) {
      this.helperService.showAlert("Debe ingresar un email.", "Error");
      loader.dismiss();
      return;
    }
  
    if (!this.contrasena) {
      this.helperService.showAlert("Debe ingresar una contraseña.", "Error");
      loader.dismiss();
      return;
    }
  
    try {
      this.storage.userCorreo = this.email;
      const req = await this.auth.signInWithEmailAndPassword(this.email, this.contrasena);
      console.log("TOKEN", await req.user?.getIdToken());
      loader.dismiss();
    
      // Redirigir al usuario a la página del menú después de iniciar sesión exitosamente
      await this.router.navigateByUrl('menu');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Manejar errores aquí si es necesario

      // Aquí redirige al menú con el correo como parámetro después del inicio de sesión
      await this.router.navigateByUrl(`/menu/${this.email}`);
    }
  }
}
  