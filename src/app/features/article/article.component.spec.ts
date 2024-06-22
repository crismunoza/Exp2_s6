import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';
import { Product } from '../../core/models/product.model';

/**
 * Pruebas unitarias para el componente ArticleComponent.
 */
describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  /**
   * Configuración inicial del módulo de pruebas.
   */
  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, ArticleComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Limpieza de localStorage después de cada prueba.
   */
  afterEach(() => {
    localStorage.clear();
  });

  /**
   * Prueba para verificar que un producto se agrega correctamente al carrito.
   */
  it('debería agregar un producto al carrito', () => {
    const nuevoUsuario: User = {
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

    localStorage.setItem('loggedInUser', JSON.stringify(nuevoUsuario));
    localStorage.setItem('users', JSON.stringify([nuevoUsuario]));

    const testProduct: Product = {
      name: 'Test Product',
      brand: 'Test Brand',
      type: 'Test Type',
      price: 100,
      imageUrl: 'test-image-url',
      showMoreInfo: false,
      moreInfo: 'Test more info',
      hidden: false
    };

    component.addToCart(testProduct);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
    expect(loggedInUser.cart.length).toBe(1);
    expect(loggedInUser.cart[0].name).toBe('Test Product');
    expect(component.alertMessage).toBe('Producto añadido al carrito');
  });
});
