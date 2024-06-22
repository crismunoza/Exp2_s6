import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetpassComponent } from './resetpass.component';
import { User } from '../../core/models/user.model';

/**
 * Pruebas unitarias para el componente ResetpassComponent.
 */
describe('ResetpassComponent', () => {
  let componente: ResetpassComponent;
  let fixture: ComponentFixture<ResetpassComponent>;
  let router: Router;

  /**
   * Configuración inicial del módulo de pruebas.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpassComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: Router, useValue: { navigate: () => null } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetpassComponent);
    componente = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  /**
   * Prueba para verificar que el componente se crea correctamente.
   */
  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  /**
   * Prueba para verificar si el correo electrónico está registrado.
   */
  it('debería verificar si el correo electrónico está registrado', () => {
    const usuario: User = {
      id: 1,
      fullName: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'OldPassword123',
      confirmPassword: 'OldPassword123',
      birthdate: '2000-01-01',
      role: 'client',
      purchaseHistory: [],
      cart: []
    };
    localStorage.setItem('users', JSON.stringify([usuario]));
    componente.resetForm.controls['email'].setValue('test@example.com');
    componente.checkEmail();
    expect(componente.currentUser).toEqual(usuario);
  });

  /**
   * Prueba para verificar que la contraseña se actualiza si la nueva contraseña y la confirmación coinciden.
   */
  it('debería actualizar la contraseña si la nueva contraseña y la confirmación coinciden', () => {
    const usuario: User = {
      id: 1,
      fullName: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'OldPassword123',
      confirmPassword: 'OldPassword123',
      birthdate: '2000-01-01',
      role: 'client',
      purchaseHistory: [],
      cart: []
    };
    localStorage.setItem('users', JSON.stringify([usuario]));
    componente.currentUser = usuario;
    componente.resetForm.controls['newPassword'].setValue('NewPassword123');
    componente.resetForm.controls['confirmPassword'].setValue('NewPassword123');
    componente.changePassword();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    expect(users[0].password).toBe('NewPassword123');
  });
});
