import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';

/**
 * Componente para mostrar el historial de compras del usuario.
 */
@Component({
  selector: 'app-record',
  standalone: true,
  imports: [CommonModule], // Asegúrate de importar CommonModule
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  /**
   * Usuario actualmente logueado.
   */
  loggedInUser: User | null = null;

  /**
   * Historial de compras del usuario.
   */
  purchaseHistory: any[] = [];

  /**
   * Constructor del componente.
   * @param platformId Identificador de la plataforma (browser o server).
   */
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  /**
   * Método de inicialización del componente.
   * Carga los datos del usuario y su historial de compras desde localStorage si está en el navegador.
   */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('loggedInUser');
      if (userData) {
        this.loggedInUser = JSON.parse(userData);
        this.purchaseHistory = this.loggedInUser?.purchaseHistory || [];
      }
    }
  }
}
