import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Pruebas unitarias para el componente AdminComponent.
 */
describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  /**
   * Configuración inicial del módulo de pruebas.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, AdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba para verificar que el componente se crea correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba para verificar que un usuario se edita correctamente.
   */
  it('editar un usuario correctamente', fakeAsync(() => {
    // Configurar datos de prueba en localStorage
    const testUsers = [
      { id: 1, fullName: 'Jose Pérez', username: 'joseperez', email: 'joseperez@example.com', birthdate: '1990-01-01', role: 'client', password: 'Joseperez12345!', confirmPassword: 'Joseperez12345!', purchaseHistory: [], cart: [] }
    ];
    localStorage.setItem('users', JSON.stringify(testUsers));
    component.ngOnInit();

    // Seleccionar el primer usuario para editar
    component.editUser(0);

    // Cambiar el nombre completo del usuario
    component.editUserForm.setValue({
      fullName: 'Jose Pérez Edited',
      username: 'joseperez',
      email: 'joseperez@example.com',
      birthdate: '1990-01-01',
      password: ''
    });

    // Enviar el formulario
    component.onSubmit();
    tick(); // Avanza el temporizador

    // Verificar que el usuario ha sido actualizado en localStorage
    const users = JSON.parse(localStorage.getItem('users')!);
    expect(users[0].fullName).toBe('Jose Pérez Edited');
    expect(component.alertMessage).toBe('Usuario actualizado correctamente.');

    flush(); // Limpia todos los temporizadores pendientes
  }));

  /**
   * Limpieza de localStorage después de cada prueba.
   */
  afterEach(() => {
    localStorage.clear();
  });
});
