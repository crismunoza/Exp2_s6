import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';

/**
 * Componente de perfil para gestionar y actualizar la información del usuario.
 */
@Component({
  selector: 'app-profile', // Selector del componente
  standalone: true, // Indicador de que este es un componente autónomo
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // Módulos importados
  templateUrl: './profile.component.html', // Ruta al template del componente
  styleUrls: ['./profile.component.css'] // Ruta a los estilos del componente
})
export class ProfileComponent implements OnInit {
  /**
   * Formulario de perfil.
   */
  profileForm: FormGroup;

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
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern(/(?=.*[A-Z])/), // Al menos una letra mayúscula
        Validators.pattern(/(?=.*\d)/), // Al menos un número
        Validators.pattern(/(?=.*[!@#$%^&*.])/), // Al menos un carácter especial
      ]],
      address: ['']
    });
  }

  /**
   * Método de inicialización del componente.
   * Carga los datos del usuario desde localStorage si está en el navegador.
   */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('loggedInUser');
      if (userData) {
        this.loggedInUser = JSON.parse(userData);
        this.profileForm.patchValue({
          fullName: this.loggedInUser?.fullName,
          username: this.loggedInUser?.username,
          email: this.loggedInUser?.email,
          birthdate: this.loggedInUser?.birthdate,
          address: this.loggedInUser?.address
        });

        if (this.loggedInUser?.role === 'admin') {
          const adminButton = document.getElementById('adminButton');
          if (adminButton) {
            adminButton.classList.remove('d-none');
          }
        }
      } else {
        this.showAlert("No has iniciado sesión. Por favor, inicia sesión primero.", "danger");
        setTimeout(() => {
          this.router.navigate(['/Login']);
        }, 1500);
      }
    }
  }

  /**
   * Maneja el envío del formulario de perfil.
   */
  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const newPassword = this.profileForm.get('newPassword')?.value;
    const updatedUser: User = {
      ...this.loggedInUser!,
      ...this.profileForm.value,
      ...(newPassword ? { password: newPassword } : {})
    };

    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(user => user.email === this.loggedInUser?.email);

    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      this.showAlert("Perfil actualizado correctamente.", "success");
    } else {
      this.showAlert("Error al actualizar el perfil.", "danger");
    }
  }

  /**
   * Navega a la página de administración.
   */
  navigateToAdmin() {
    this.router.navigate(['/Admin']);
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
   * Acceso rápido a los controles del formulario de perfil.
   */
  get f() {
    return this.profileForm.controls;
  }
}
