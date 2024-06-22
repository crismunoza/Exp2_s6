import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';

/**
 * Componente de registro para crear nuevos usuarios.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /**
   * Formulario de registro.
   */
  registerForm: FormGroup;

  /**
   * Mensaje de alerta.
   */
  alertMessage: string = '';

  /**
   * Tipo de alerta (success, danger, etc.).
   */
  alertType: string = '';

  /**
   * Lista de usuarios registrados.
   */
  users: User[] = [];

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear el formulario reactivo.
   * @param router Router para la navegación.
   */
  constructor(private fb: FormBuilder, private router: Router) {
    // Inicialización del formulario con validaciones
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern(/(?=.*[A-Z])/), // Al menos una letra mayúscula
        Validators.pattern(/(?=.*\d)/), // Al menos un número
        Validators.pattern(/(?=.*[!@#$%^&*.])/), // Al menos un carácter especial
      ]],
      confirmPassword: ['', Validators.required],
      birthdate: ['', Validators.required],
      address: ['']
    }, { 
      validators: this.passwordMatchValidator 
    } as AbstractControlOptions);
  }

  /**
   * Método de inicialización del componente.
   * Carga los usuarios desde localStorage si existen.
   */
  ngOnInit() {
    const localData = localStorage.getItem('users');
    if (localData != null) {
      this.users = JSON.parse(localData);
    } else {
      console.warn('No users found in localStorage');
    }
  }

  /**
   * Validador para comprobar que las contraseñas coincidan.
   * @param control Formulario de registro.
   * @returns ValidationErrors si las contraseñas no coinciden, null de lo contrario.
   */
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else if (confirmPassword) {
      confirmPassword.setErrors(null);
    }
    return null;
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
   * Maneja el envío del formulario de registro.
   */
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      console.log('Formulario inválido', this.registerForm);
      return;
    }
  
    const existingUser = this.users.find((user: User) => user.email === this.registerForm.value.email);
  
    if (existingUser) {
      this.showAlert("Ya existe un usuario registrado con este correo electrónico.", "danger");
      console.log('Usuario existente', existingUser);
      return;
    }
  
    const newUser: User = {
      id: this.users.length + 1,
      fullName: this.registerForm.value.fullName,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      birthdate: this.registerForm.value.birthdate,
      address: this.registerForm.value.address,
      role: 'client', // Por defecto, todos los nuevos usuarios son clientes
      purchaseHistory: [],
      cart: []
    };
  
    this.users.push(newUser);
  
    try {
      localStorage.setItem('users', JSON.stringify(this.users));
      this.showAlert("Registro exitoso. Ahora puedes iniciar sesión.", "success");
      console.log('Nuevo usuario registrado', newUser);
      setTimeout(() => {
        this.router.navigate(['/Login']);
      }, 2000);
    } catch (error) {
      console.error('Error al guardar en LocalStorage', error);
      this.showAlert("Error al registrar el usuario. Por favor, intente nuevamente.", "danger");
    }
  }

  /**
   * Acceso rápido a los controles del formulario de registro.
   */
  get f() {
    return this.registerForm.controls;
  }
}
