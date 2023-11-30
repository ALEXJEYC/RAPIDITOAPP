import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { Map, tileLayer, marker } from 'leaflet';
import { NavController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import { Toast } from '@capacitor/toast';
import { ActivatedRoute } from '@angular/router';
import { StorageService, Usuario } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, AfterViewInit {
  latitude: number | null = null;
  longitude: number | null = null;
  map: L.Map;
  userEmail: string | null = null;
  email: string = "";

  constructor(
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController,
    private helper:HelperService,
    private animationCtrl: AnimationController,
    private route: ActivatedRoute,
    private storage: StorageService,
  ) {}
  async dispositivo(){
    const device = await   Device.getInfo();
    console.log("Información",device);
    await this.helper.showToast("Su dispositivo es: " + device.model);
  }
  
  async goToProfile() {
    this.storage.userCorreo = this.email;
    const animation = this.animationCtrl.create()
      .addElement(document.querySelector('.ion-page')); // Elemento principal de la página
  
    animation.duration(500) // Duración de la animación en milisegundos
      .iterations(1)
      .fromTo('opacity', 0.5, 1) // Animación de opacidad
  
    await animation.play(); // Ejecutar la animación antes de la navegación
  
    await this.router.navigateByUrl(`/perfil/${this.email}`);
  }
  
  async goToSettings() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelector('.ion-page')); // Elemento principal de la página
  
      animation.duration(500) // Duración de la animación en milisegundos
      .iterations(1)
      .fromTo('opacity', 0.5, 1) // Animación de opacidad
  
    await animation.play(); // Ejecutar la animación antes de la navegación
  
    await this.router.navigateByUrl(`/configuracion/${this.email}`);
  }
  async goToTravel() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelector('.ion-page')); // Elemento principal de la página
  
      animation.duration(500) // Duración de la animación en milisegundos
      .iterations(1)
      .fromTo('opacity', 0.5, 1) // Animación de opacidad
  
    await animation.play(); // Ejecutar la animación antes de la navegación
  
    await this.router.navigateByUrl(`/viajar/${this.email}`);
  }

  async goToHistory() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelector('.ion-page')); // Elemento principal de la página
  
      animation.duration(500) // Duración de la animación en milisegundos
      .iterations(1)
      .fromTo('opacity', 0.5, 1) // Animación de opacidad
  
    await animation.play(); // Ejecutar la animación antes de la navegación
  
    await this.router.navigateByUrl(`/historial-viajes/${this.email}`);
  }


  async ngOnInit() {
    this.getDeviceLocation(); 
    this.dispositivo();
    this.route.params.subscribe(params => {
      this.userEmail = params['correo'];
      console.log('Correo del usuario:', this.userEmail);
    });
  }


  ngAfterViewInit(): void {
  }
  
async getDeviceLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.initMap(); 
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
    }
  }
  
  initMap() {
    if (!this.map) {
      L.Icon.Default.imagePath = 'assets/img/';
  
      this.map = L.map('map').setView([this.latitude, this.longitude], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);
  
      const markerItem = marker([this.latitude, this.longitude]).addTo(this.map)
        .bindPopup('Ubicación actual');
      this.map.fitBounds([
        [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
      ]);
      
    
    } else {
      this.map.setView([this.latitude, this.longitude], 13);
      
      
    }

  }
  

  async logout() {
    const confirmAlert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            // Agrega aquí el código para cerrar la sesión del usuario
            // Esto puede incluir el uso de AngularFireAuth o cualquier otro servicio de autenticación que estés utilizando.

            // Después de cerrar la sesión, redirige al usuario a la página de inicio de sesión.
            this.router.navigateByUrl('login');
          }
        }
      ]
      
    });

    await confirmAlert.present();
  }
  
  async mostrarMensajeDispositivo() {
    const deviceModel = Capacitor.getPlatform();
    await Toast.show({
      text: `Tu dispositivo es: ${deviceModel}`,
      duration: 'long'
    });
  }
  
  
  
}

