import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * LoginComponent es el componente encargado del inicio de sesión de los usuarios.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Formulario de inicio de sesión.
   */
  loginForm: FormGroup;

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
   * @param fb FormBuilder para crear el formulario reactivo.
   * @param router Router para la navegación.
   */
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      adminMode: [false]
    });
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit() {}

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

  /**
   * Maneja el envío del formulario de inicio de sesión.
   */
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const adminMode = this.loginForm.value.adminMode;

    if (adminMode && email === 'admin@gmail.com' && password === 'admin1234') {
      const adminUser = { email, role: 'admin', username: 'Admin' };
      localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
      this.showAlert('Inicio de sesión como administrador exitoso.', 'success');
      setTimeout(() => {
        this.router.navigate(['/Article']);
      }, 1500);
      setTimeout(() => {
        window.location.reload();
      }, 1900);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.showAlert('Inicio de sesión exitoso.', 'success');
      setTimeout(() => {
        this.router.navigate(['/Article']);
      }, 1500);
      setTimeout(() => {
        window.location.reload();
      }, 1900);
    } else {
      this.showAlert('Correo electrónico o contraseña incorrectos.', 'danger');
    }
  }
}
