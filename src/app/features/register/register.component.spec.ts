import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { User } from '../../core/models/user.model';

/**
 * Pruebas unitarias para el componente RegisterComponent.
 */
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: jasmine.SpyObj<Router>;

  /**
   * Configuración inicial del módulo de pruebas.
   */
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  /**
   * Limpia el almacenamiento local antes de cada prueba.
   */
  beforeEach(() => {
    localStorage.clear(); // Limpiar el almacenamiento local antes de cada prueba
  });

  /**
   * Limpia el almacenamiento local después de cada prueba.
   */
  afterEach(() => {
    localStorage.clear(); // Limpiar el almacenamiento local después de cada prueba
  });

  /**
   * Prueba para verificar que un nuevo usuario se registre correctamente con datos válidos.
   */
  it('debería registrar un nuevo usuario con datos válidos', fakeAsync(() => {
    const nuevoUsuario: User = {
      id: 1,
      fullName: 'Jose Pérez',
      username: 'joseperez',
      email: 'test@example.com',
      password: 'Joseperez12345!',
      confirmPassword: 'Joseperez12345!',
      birthdate: '1995-05-15',
      address: 'Calle Falsa 123',
      role: 'client',
      purchaseHistory: [],
      cart: []
    };

    // Verificar el estado inicial del localStorage
    console.log('Estado inicial del localStorage:', localStorage.getItem('users'));

    component.registerForm.controls['fullName'].setValue(nuevoUsuario.fullName);
    component.registerForm.controls['username'].setValue(nuevoUsuario.username);
    component.registerForm.controls['email'].setValue(nuevoUsuario.email);
    component.registerForm.controls['password'].setValue(nuevoUsuario.password);
    component.registerForm.controls['confirmPassword'].setValue(nuevoUsuario.confirmPassword);
    component.registerForm.controls['birthdate'].setValue(nuevoUsuario.birthdate);
    component.registerForm.controls['address'].setValue(nuevoUsuario.address);

    // Marca todas las entradas del formulario como tocadas para que las validaciones se apliquen
    Object.keys(component.registerForm.controls).forEach(field => {
      const control = component.registerForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    fixture.detectChanges(); // Asegura que la vista se actualice con los valores de formulario

    // Verificar el estado del formulario antes de la sumisión
    console.log('Estado del formulario antes de la sumisión:', component.registerForm.valid);

    component.onSubmit();
    tick(2000); // Simula el paso del tiempo para que el setTimeout en onSubmit se ejecute
    flush(); // Vacía todos los temporizadores pendientes

    const usuariosGuardados = JSON.parse(localStorage.getItem('users') || '[]');

    // Verificar el estado de localStorage después de la sumisión
    console.log('Estado de localStorage después de la sumisión:', usuariosGuardados);

    expect(usuariosGuardados.length).toBe(1);
    expect(usuariosGuardados[0].email).toBe(nuevoUsuario.email);

    // Verifica que la navegación se haya llamado correctamente
    expect(router.navigate).toHaveBeenCalledWith(['/Login']);
  }));
});
