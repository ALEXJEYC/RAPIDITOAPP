import { Component, OnInit } from '@angular/core';
import { StorageService, Vehiculo } from 'src/app/services/storage.service';
import { HelperService } from 'src/app/services/helper.service';
import { ModalController } from '@ionic/angular'; // Asegúrate de importar el ModalController si lo estás utilizando para las ventanas emergentes

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {
  vehiculos: Vehiculo[] = [];

  constructor(
    private storageService: StorageService,
    private helperService: HelperService,
    private modalController: ModalController // Asegúrate de tener el ModalController en los imports si lo utilizas para las ventanas emergentes
  ) {}

  ngOnInit() {
    this.cargarVehiculos();
  }

  async cargarVehiculos() {
    const usuarios = await this.storageService.obtenerUsuario();
    this.vehiculos = usuarios.reduce((vehiculos: Vehiculo[], usuario) => {
      if (usuario.vehiculo) {
        vehiculos.push(usuario.vehiculo);
      }
      return vehiculos;
    }, []);
  }

  async solicitarViaje(vehiculo: Vehiculo) {
    // Lógica para solicitar el vehículo
    // ...

    // Mostrar mensaje emergente con HelperService
    const mensaje = 'Tu vehículo ha sido solicitado. El conductor está en camino.';
    await this.helperService.mostrarMensaje(mensaje);

    // Ejemplo de cómo podrías mostrar un mensaje con el ModalController
    // Puedes adaptar esta lógica según cómo estés implementando las ventanas emergentes
    // const modal = await this.modalController.create({
    //   component: TuComponenteDeMensaje,
    //   componentProps: { mensaje: mensaje }
    // });
    // return await modal.present();
  }
}