import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';
import { Product } from '../../core/models/product.model';
import { userStatus } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

/**
 * PayComponent es el componente encargado de gestionar el proceso de pago.
 */
@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegúrate de importar FormsModule
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  /**
   * Usuario actualmente logueado.
   */
  loggedInUser: User | null = null;

  /**
   * Mensaje de alerta.
   */
  alertMessage: string = '';

  /**
   * Tipo de alerta (success, danger, etc.).
   */
  alertType: string = '';

  /**
   * Constructor del componente.
   * @param router Router para la navegación.
   * @param platformId Identificador de la plataforma (browser o server).
   */
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  /**
   * Método de inicialización del componente.
   * Carga los datos del usuario desde localStorage si está en el navegador.
   */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('loggedInUser');
      if (userData) {
        this.loggedInUser = JSON.parse(userData);
      } else {
        this.showAlert('Por favor, inicia sesión para proceder con el pago.', 'danger');
        setTimeout(() => {
          this.router.navigate(['/Login']);
        }, 1500);
      }
    }
  }

  /**
   * Maneja el envío del formulario de pago.
   * @param form Formulario de pago.
   */
  onSubmit(form: NgForm) {
    if (!this.loggedInUser) {
      this.showAlert('Por favor, inicia sesión para proceder con el pago.', 'danger');
      setTimeout(() => {
        this.router.navigate(['/Login']);
      }, 1500);
      return;
    }

    const { cardNumber, expiryDate, cvv } = form.value;
    if (cardNumber && expiryDate && cvv) {
      const cart = this.loggedInUser.cart || [];
      const purchaseDate = new Date().toISOString();

      this.loggedInUser.purchaseHistory = this.loggedInUser.purchaseHistory || [];
      cart.forEach((item: Product) => {
        this.loggedInUser!.purchaseHistory.push({
          ...item,
          date: purchaseDate
        });
      });

      // Vaciar el carrito
      this.loggedInUser.cart = [];
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));

      let users: User[] = (JSON.parse(localStorage.getItem('users') || '[]') as (User | null)[])
        .reduce((acc: User[], user: User | null) => {
          if (user !== null) acc.push(user);
          return acc;
        }, []);

      // Actualizar la información del usuario
      users = users.map(user => {
        if (user.email === this.loggedInUser!.email) {
          return this.loggedInUser!;
        }
        return user;
      });

      localStorage.setItem('users', JSON.stringify(users));

      userStatus.next(this.loggedInUser); // Emitir estado del usuario actualizado
      this.showAlert('Pago realizado con éxito. Gracias por tu compra.', 'success');
      setTimeout(() => {
        this.router.navigate(['/Record']);
      }, 1500);
    } else {
      this.showAlert('Por favor, completa todos los campos para proceder con el pago.', 'danger');
    }
  }

  /**
   * Muestra un mensaje de alerta.
   * @param message Mensaje de la alerta.
   * @param type Tipo de alerta (success, danger, etc.).
   */
  showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}
