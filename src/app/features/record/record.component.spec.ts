import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordComponent } from './record.component';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';
import { Product } from '../../core/models/product.model';

/**
 * Pruebas unitarias para el componente RecordComponent.
 */
describe('RecordComponent', () => {
  let component: RecordComponent;
  let fixture: ComponentFixture<RecordComponent>;

  /**
   * Configuración inicial del módulo de pruebas.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RecordComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba para verificar que el historial de compras del usuario logueado se carga correctamente.
   */
  it('cargar el historial de compras del usuario logueado', () => {
    const mockUser: User = {
      id: 1,
      fullName: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      birthdate: '1990-01-01',
      address: '123 Main St',
      role: 'client',
      purchaseHistory: [
        { name: 'Product 1', brand: 'Brand A', type: 'Type 1', price: 100, imageUrl: 'url1', showMoreInfo: false, moreInfo: 'Info 1', hidden: false, date: '2023-01-01' },
        { name: 'Product 2', brand: 'Brand B', type: 'Type 2', price: 200, imageUrl: 'url2', showMoreInfo: false, moreInfo: 'Info 2', hidden: false, date: '2023-02-01' }
      ] as Product[],
      cart: []
    };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'loggedInUser') {
        return JSON.stringify(mockUser);
      }
      return null;
    });

    component.ngOnInit();

    expect(component.loggedInUser).toEqual(mockUser);
    expect(component.purchaseHistory.length).toBe(2);
  });
});
