import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';

/**
 * AdminComponent es el componente encargado de gestionar la administración de usuarios.
 * Permite listar, editar y eliminar usuarios.
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  /**
   * Lista de usuarios.
   */
  users: User[] = [];

  /**
   * Índice del usuario seleccionado para editar.
   */
  selectedUserIndex: number | null = null;

  /**
   * Formulario para editar los datos del usuario.
   */
  editUserForm: FormGroup;

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
   * @param platformId Identificador de la plataforma (browser o server).
   */
  constructor(private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    this.editUserForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      password: ['']
    });
  }

  /**
   * Método de inicialización del componente.
   * Carga los usuarios desde localStorage y renderiza la tabla de usuarios.
   */
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('users');
      if (userData) {
        this.users = JSON.parse(userData);
      }
      this.renderUserTable();
    } else {
      console.warn('localStorage is not available');
    }
  }

  /**
   * Renderiza la tabla de usuarios.
   */
  renderUserTable() {

  }

  /**
   * Selecciona un usuario para editar.
   * @param index Índice del usuario en la lista.
   */
  editUser(index: number) {
    this.selectedUserIndex = index;
    const user = this.users[index];
    this.editUserForm.patchValue({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
      password: ''
    });
  }

  /**
   * Elimina un usuario de la lista.
   * @param index Índice del usuario en la lista.
   */
  deleteUser(index: number) {
    this.users.splice(index, 1);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
    this.showAlert('Usuario eliminado correctamente.', 'danger');
    this.renderUserTable();
  }

  /**
   * Maneja el envío del formulario de edición de usuario.
   */
  onSubmit() {
    if (this.editUserForm.invalid) {
      this.editUserForm.markAllAsTouched();
      return;
    }

    const updatedUser = {
      ...this.users[this.selectedUserIndex!],
      ...this.editUserForm.value
    };

    if (!this.editUserForm.value.password) {
      delete updatedUser.password;
    }

    this.users[this.selectedUserIndex!] = updatedUser;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
    this.showAlert('Usuario actualizado correctamente.', 'success');
    this.renderUserTable();
    document.getElementById('editUserModal')?.click(); // Cerrar el modal
  }

  /**
   * Muestra un mensaje de alerta.
   * @param message El mensaje de la alerta.
   * @param type El tipo de alerta (success, danger, etc.).
   */
  showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }

  /**
   * Acceso rápido a los controles del formulario de edición de usuario.
   */
  get f() {
    return this.editUserForm.controls;
  }
}
