import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

/**
 * Pruebas unitarias para el componente AppComponent.
 */
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  /**
   * Configuración inicial del módulo de pruebas.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Importa directamente el componente standalone
        RouterTestingModule // Importa RouterTestingModule para proporcionar ActivatedRoute
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba para verificar que el componente se haya creado correctamente.
   */
  it('renderizar el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba para verificar que el título se establece correctamente.
   */
  it(`título 'Exp2_S6'`, () => {
    expect(component.title).toEqual('Exp2_S6');
  });

  /**
   * Prueba para verificar que el título se renderiza en el template.
   */
  it('debería renderizar el template con el título', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
