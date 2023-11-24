import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HelperService } from 'src/app/services/helper.service';
import { Vehiculo } from 'src/app/services/storage.service'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario:any;
  vehiculo: Vehiculo;

  constructor(private storage:StorageService, private auth:AngularFireAuth, private helper:HelperService) { }

  ngOnInit() {
    this.cargarInformacionUsuario();
  }

  async cargarInformacionUsuario() {
    const userEmail = await this.auth.currentUser;
    this.usuario = (await this.storage.obtenerUsuario()).find((e) => e.email === userEmail?.email);

    if (this.usuario) {
      // Obtener los datos del vehículo si existen
      this.vehiculo = await this.storage.obtenerVehiculo(this.usuario.email);
    }
  }
}