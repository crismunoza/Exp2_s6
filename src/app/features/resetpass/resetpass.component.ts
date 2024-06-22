import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';

/**
 * Componente para restablecer la contraseña del usuario.
 */
@Component({
  selector: 'app-resetpass',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {
  /**
   * Formulario de restablecimiento de contraseña.
   */
  resetForm: FormGroup;

  /**
   * Mensaje de alerta.
   */
  alertMessage: string = '';

  /**
   * Tipo de alerta (success, danger, etc.).
   */
  alertType: string = '';

  /**
   * Usuario actualmente autenticado.
   */
  currentUser: User | null = null;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear el formulario reactivo.
   * @param router Router para la navegación.
   * @param platformId Identificador de la plataforma (browser o server).
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // Inicialización del formulario con validaciones
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern(/(?=.*[A-Z])/), // Al menos una letra mayúscula
        Validators.pattern(/(?=.*\d)/), // Al menos un número
        Validators.pattern(/(?=.*[!@#$%^&*.])/), // Al menos un carácter especial
      ]],
      confirmPassword: ['', Validators.required]
    });
  }

  /**
   * Método de inicialización del componente.
   * Desactiva los campos de contraseña inicialmente.
   */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.togglePasswordFields(false);
    }
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit() {
    if (!this.currentUser) {
      this.checkEmail();
    } else {
      this.changePassword();
    }
  }

  /**
   * Verifica el correo electrónico del usuario.
   */
  checkEmail() {
    const email = this.resetForm.get('email')?.value;
    if (isPlatformBrowser(this.platformId)) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      this.currentUser = users.find(user => user.email === email) || null;

      if (this.currentUser) {
        this.togglePasswordFields(true);
        this.showAlert('Email encontrado. Por favor, ingrese su nueva contraseña.', 'info');
      } else {
        this.showAlert('El correo electrónico no está registrado.', 'danger');
      }
    }
  }

  /**
   * Cambia la contraseña del usuario.
   */
  changePassword() {
    const newPassword = this.resetForm.get('newPassword')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.showAlert('Las contraseñas no coinciden.', 'danger');
      return;
    }

    if (this.currentUser) {
      this.currentUser.password = newPassword;
      if (isPlatformBrowser(this.platformId)) {
        let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.map(user => user.email === this.currentUser!.email ? this.currentUser! : user);
        localStorage.setItem('users', JSON.stringify(users));
        this.showAlert('Contraseña actualizada con éxito.', 'success');
        setTimeout(() => {
          this.router.navigate(['/Login']);
        }, 1500);
      }
    }
  }

  /**
   * Muestra u oculta los campos de contraseña.
   * @param show Indica si se deben mostrar los campos de contraseña.
   */
  togglePasswordFields(show: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      const passwordSection = document.getElementById('password-section');
      const confirmPasswordSection = document.getElementById('confirm-password-section');
      const emailSection = document.getElementById('email-section');
      const submitButton = document.getElementById('submit-button');

      if (show) {
        emailSection?.classList.add('d-none');
        passwordSection?.classList.remove('d-none');
        confirmPasswordSection?.classList.remove('d-none');
        if (submitButton) submitButton.textContent = 'Cambiar Contraseña';
      } else {
        emailSection?.classList.remove('d-none');
        passwordSection?.classList.add('d-none');
        confirmPasswordSection?.classList.add('d-none');
        if (submitButton) submitButton.textContent = 'Enviar';
      }
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

  /**
   * Acceso rápido a los controles del formulario de restablecimiento de contraseña.
   */
  get f() {
    return this.resetForm.controls;
  }
}
