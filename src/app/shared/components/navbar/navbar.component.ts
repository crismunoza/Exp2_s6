import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../core/models/user.model';

/**
 * Observable para el estado del usuario.
 */
export const userStatus = new BehaviorSubject<User | null>(null);

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /**
   * Usuario actualmente logueado.
   */
  loggedInUser: User | null = null;

  /**
   * Número de productos en el carrito del usuario.
   */
  cartCount: number = 0;

  /**
   * Constructor del componente.
   * @param router Router para la navegación.
   * @param cdr ChangeDetectorRef para forzar la detección de cambios.
   * @param platformId Identificador de la plataforma (browser o server).
   */
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  /**
   * Método de inicialización del componente.
   * Verifica el estado del usuario y se suscribe a los cambios en el estado del usuario.
   */
  ngOnInit() {
    this.checkUserStatus();
    userStatus.subscribe(user => {
      this.loggedInUser = user;
      this.cartCount = user ? user.cart.length : 0;
      this.cdr.detectChanges(); // Forzar detección de cambios
    });
  }

  /**
   * Verifica el estado del usuario logueado desde localStorage.
   */
  checkUserStatus() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('loggedInUser');
      if (userData) {
        this.loggedInUser = JSON.parse(userData);
        userStatus.next(this.loggedInUser); // Emitir estado del usuario
      }
    } else {
      console.warn('localStorage is not available');
    }
  }

  /**
   * Maneja el cierre de sesión del usuario.
   * Elimina los datos del usuario de localStorage y actualiza el estado del usuario.
   */
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('loggedInUser');
      this.loggedInUser = null;
      userStatus.next(null); // Emitir estado del usuario
      this.router.navigate(['/']);
    }
  }
}
