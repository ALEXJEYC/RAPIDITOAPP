import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HelperService } from 'src/app/services/helper.service';
import { Vehiculo, Usuario } from 'src/app/services/storage.service'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario: any;
  vehiculo: Vehiculo;
  userEmail: string | null = null;
  imagenAvatar: string = "https://ionicframework.com/docs/img/demos/avatar.svg";

  constructor(
    private storage:StorageService,
    private auth:AngularFireAuth,
    private helper:HelperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarInformacionUsuario();
  }

  async cargarInformacionUsuario() {
    const userEmail = await this.auth.currentUser;
    this.usuario = (await this.storage.obtenerUsuario()).find((e) => e.email === userEmail?.email);

    if (this.usuario) {
      // Obtener la URL de la imagen del avatar específica para este usuario
      const url = await this.storage.getItem<string>(`imagenAvatar_${this.usuario?.email}`);
      if (url) {
        this.imagenAvatar = url;
      }
    }
  }

  async abrirCamara() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      // Actualizar la imagen del avatar con la nueva foto tomada
      this.imagenAvatar = image.webPath;

      // Almacenar permanentemente la URL de la imagen específica para este usuario
      await this.storage.setItem(`imagenAvatar_${this.usuario?.email}`, this.imagenAvatar);
    } catch (error) {
      console.error('Error al abrir la cámara', error);
    }
  }
}
