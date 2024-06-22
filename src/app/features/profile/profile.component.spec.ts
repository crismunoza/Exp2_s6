import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../core/models/user.model';

/**
 * Pruebas unitarias para el componente ProfileComponent.
 */
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  /**
   * Configuración inicial del módulo de pruebas.
   */
  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba para verificar que los datos del usuario logueado se cargan en el formulario.
   */
  it('debería cargar los datos del usuario logueado en el formulario', () => {
    const mockUser: User = {
      id: 1,
      fullName: 'Jose Pérez',
      username: 'joseperez',
      email: 'nuevo@example.com',
      password: 'Joseperez12345!',
      confirmPassword: 'Joseperez12345!',
      birthdate: '1995-05-15',
      address: 'Calle Falsa 123',
      role: 'client',
      purchaseHistory: [],
      cart: []
    };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'loggedInUser') {
        return JSON.stringify(mockUser);
      }
      return null;
    });

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.profileForm.value.fullName).toBe(mockUser.fullName);
    expect(component.profileForm.value.username).toBe(mockUser.username);
    expect(component.profileForm.value.email).toBe(mockUser.email);
    expect(component.profileForm.value.birthdate).toBe(mockUser.birthdate);
    expect(component.profileForm.value.address).toBe(mockUser.address);
  });
});
