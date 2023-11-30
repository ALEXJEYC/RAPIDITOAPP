import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  userEmail: string | null = null;
  loading: boolean = true; // Inicialmente, se está cargando

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Simulando una carga de datos (por ejemplo, un retardo de 2 segundos)
    setTimeout(() => {
      // En este ejemplo, no se han encontrado viajes previos, por lo que el historial está vacío
      // Si tienes datos reales, puedes llenar el arreglo historial aquí
      this.loading = false; // Cambio a falso cuando se ha completado la carga
    }, 2000);
    this.route.params.subscribe(params => {
      this.userEmail = params['correo'];
      console.log('Correo del usuario:', this.userEmail);
    });
  }
}