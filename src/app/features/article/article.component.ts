import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { User } from '../../core/models/user.model';
import { userStatus } from '../../shared/components/navbar/navbar.component'; 

/**
 * ArticleComponent es el componente encargado de mostrar y gestionar los productos.
 * Permite ver información detallada de los productos y agregarlos al carrito.
 */
@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  /**
   * Lista de productos disponibles.
   */
  products = [
    {
      name: 'POP MARVEL: BLACK WIDOW- TASKMASTER W/CLAWS',
      brand: 'Funko',
      type: 'Figuras Estática',
      price: 10990,
      imageUrl: '../../assets/Productos-img/BLACK WIDOW.webp',
      showMoreInfo: false,
      moreInfo: 'Figura de colección de Black Widow - Taskmaster con garras, de la marca Funko.',
      hidden: false
    },
    {
      name: 'POP GAMES: RAGE 2 - IMMORTAL SHROUDED',
      brand: 'Funko',
      type: 'Figuras Estática',
      price: 10990,
      imageUrl: '../../assets/Productos-img/RAGE 2 - IMMORTAL SHROUDED.webp',
      showMoreInfo: false,
      moreInfo: 'Figura de colección de Rage 2 - Immortal Shrouded, de la marca Funko.',
      hidden: false
    },
    {
      name: 'POP-FIGURA POP GAMES MARVEL VS CAPCOM INFINITE 2PK CAPT MARVEL VS CHUN-LI',
      brand: 'Funko',
      type: 'Figuras Estática',
      price: 20000,
      imageUrl: '../../assets/Productos-img/MARVEL VS CAPCOM.webp',
      showMoreInfo: false,
      moreInfo: 'Figura de colección de Marvel vs Capcom Infinite 2PK Captain Marvel vs Chun-Li, de la marca Funko.',
      hidden: false
    },
    {
      name: 'Avengers Battle of New York Edition: Thor S.H. Figuarts',
      brand: 'Bandai',
      type: 'Figuras Articuladas',
      price: 39990,
      imageUrl: '../../assets/Productos-img/thor.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Thor, edición Avengers Battle of New York, de la marca Bandai.',
      hidden: false
    },
    {
      name: 'Avengers Tech-On Avengers CAPTAIN AMERICA S.H.Figuarts',
      brand: 'Bandai',
      type: 'Figuras Articuladas',
      price: 58496,
      imageUrl: '../../assets/Productos-img/AMERICA.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Captain America Tech-On, de la marca Bandai.',
      hidden: false
    },
    {
      name: 'Avengers Infinity War Thanos S.H.Figuarts de Bandai',
      brand: 'Bandai',
      type: 'Figuras Articuladas',
      price: 44995,
      imageUrl: '../../assets/Productos-img/thanos.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Thanos, de la marca Bandai.',
      hidden: false
    },
    {
      name: 'Digimon SHINEGREYMON Figure Rise Standard',
      brand: 'Bandai Hobby',
      type: 'Maqueta Armable',
      price: 47992,
      imageUrl: '../../assets/Productos-img/hine.webp',
      showMoreInfo: false,
      moreInfo: 'Maqueta armable de ShineGreymon, de la serie Digimon, de la marca Bandai Hobby.',
      hidden: false
    },
    {
      name: 'Digimon Tamers DUKEMON Figure Rise Standard',
      brand: 'Bandai Hobby',
      type: 'Maqueta Armable',
      price: 22744,
      imageUrl: '../../assets/Productos-img/duke.webp',
      showMoreInfo: false,
      moreInfo: 'Maqueta armable de Dukemon, de la serie Digimon Tamers, de la marca Bandai Hobby.',
      hidden: false
    },
    {
      name: 'Uzumaki Naruto Figure Rise Standard',
      brand: 'Bandai Hobby',
      type: 'Figuras Articuladas',
      price: 19990,
      imageUrl: '../../assets/Productos-img/uzu.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Uzumaki Naruto, de la serie Naruto, de la marca Bandai Hobby.',
      hidden: false
    },
    {
      name: 'Chainsaw Man Denji Nendoroid',
      brand: 'Good Smile Company',
      type: 'Figuras Articuladas',
      price: 48743,
      imageUrl: '../../assets/Productos-img/chaw.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Denji, de Chainsaw Man, de la marca Good Smile Company.',
      hidden: false
    },
    {
      name: 'Kimetsu no Yaiba HASHIBIRA INOZUKE Figma DX Ver.',
      brand: 'Good Smile Company',
      type: 'Figuras Articuladas',
      price: 101243,
      imageUrl: '../../assets/Productos-img/hasbri.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Hashibira Inozuke DX Ver., de Kimetsu no Yaiba, de la marca Good Smile Company.',
      hidden: false
    },
    {
      name: 'Jujutsu kaisen Yuji Itadori POPUP Parade',
      brand: 'Good Smile Company',
      type: 'Figuras Estática',
      price: 26990,
      imageUrl: '../../assets/Productos-img/yuji.webp',
      showMoreInfo: false,
      moreInfo: 'Figura de colección de Yuji Itadori, de Jujutsu Kaisen, de la marca Good Smile Company.',
      hidden: false
    },
    {
      name: 'Mighty Morphin Power Ranger RED RANGER Lightning Collection',
      brand: 'Hasbro',
      type: 'Figuras Articuladas',
      price: 20994,
      imageUrl: '../../assets/Productos-img/red.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada del Red Ranger, de Mighty Morphin Power Rangers, de la marca Hasbro.',
      hidden: false
    },
    {
      name: 'Moon Knight Marvel Legends Series',
      brand: 'Hasbro',
      type: 'Figuras Articuladas',
      price: 24745,
      imageUrl: '../../assets/Productos-img/moon.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Moon Knight, de la serie Marvel Legends, de la marca Hasbro.',
      hidden: false
    },
    {
      name: 'Star Wars Darth Maul (Mandalore) 6-Inch Action Figure The Black Series.',
      brand: 'Hasbro',
      type: 'Figuras Articuladas',
      price: 21995,
      imageUrl: '../../assets/Productos-img/maul.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Darth Maul (Mandalore), de Star Wars The Black Series, de la marca Hasbro.',
      hidden: false
    },
    {
      name: 'The Boys! Black Noir MAFEX',
      brand: 'MAFEX',
      type: 'Figuras Articuladas',
      price: 81743,
      imageUrl: '../../assets/Productos-img/noir.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Black Noir, de la serie The Boys!, de la marca MAFEX.',
      hidden: false
    },
    {
      name: 'Deadpool X-Force Ver. MAFEX',
      brand: 'MAFEX',
      type: 'Figuras Articuladas',
      price: 83993,
      imageUrl: '../../assets/Productos-img/deadd.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Deadpool X-Force Ver., de la marca MAFEX.',
      hidden: false
    },
    {
      name: 'Avengers Infinity War LOKI MAFEX',
      brand: 'MAFEX',
      type: 'Figuras Articuladas',
      price: 90994,
      imageUrl: '../../assets/Productos-img/loki.webp',
      showMoreInfo: false,
      moreInfo: 'Figura articulada de Loki, de Avengers Infinity War, de la marca MAFEX.',
      hidden: false
    }
  ];

  /**
   * Producto seleccionado para mostrar más información.
   */
  selectedProduct: Product | null = null;

  /**
   * Filtros aplicados a la lista de productos.
   */
  filters: any = {
    price: [],
    brand: [],
    type: []
  };

  /**
   * Mensaje de alerta.
   */
  alertMessage: string = '';

  /**
   * Constructor del componente.
   * @param router Router para la navegación.
   */
  constructor(private router: Router) {}

  /**
   * Muestra más información sobre un producto.
   * @param product Producto seleccionado.
   */
  toggleMoreInfo(product: Product) {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden'; // Evita el desplazamiento de la página
  }

  /**
   * Cierra la información adicional del producto.
   */
  closeMoreInfo() {
    this.selectedProduct = null;
    document.body.style.overflow = 'auto'; // Permite el desplazamiento de la página
  }

  /**
   * Actualiza los filtros aplicados a los productos.
   * @param type Tipo de filtro (precio, marca, tipo).
   * @param value Valor del filtro.
   * @param event Evento del checkbox.
   */
  updateFilters(type: string, value: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.filters[type].push(value);
    } else {
      const index = this.filters[type].indexOf(value);
      if (index > -1) {
        this.filters[type].splice(index, 1);
      }
    }
    this.filterProducts();
  }

  /**
   * Filtra los productos según los filtros aplicados.
   */
  filterProducts() {
    this.products.forEach(product => {
      const matchesPrice = this.filters.price.length === 0 || this.filters.price.some((priceRange: string) => this.checkPriceRange(product.price, priceRange));
      const matchesBrand = this.filters.brand.length === 0 || this.filters.brand.includes(product.brand);
      const matchesType = this.filters.type.length === 0 || this.filters.type.includes(product.type);

      product.hidden = !(matchesPrice && matchesBrand && matchesType);
    });
  }

  /**
   * Verifica si el precio del producto está dentro del rango especificado.
   * @param price Precio del producto.
   * @param range Rango de precio.
   * @returns true si el precio está dentro del rango, false en caso contrario.
   */
  checkPriceRange(price: number, range: string): boolean {
    switch(range) {
      case '$0 - $9.990':
        return price >= 0 && price <= 9990;
      case '$10.000 - $19.990':
        return price >= 10000 && price <= 19990;
      case '$50.000 - $99.990':
        return price >= 50000 && price <= 99990;
      case 'Sobre $100.000':
        return price >= 100000;
      default:
        return false;
    }
  }

  /**
   * Agrega un producto al carrito del usuario.
   * @param product Producto a agregar al carrito.
   */
  addToCart(product: Product) {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const loggedInUser: User = JSON.parse(userData);
      loggedInUser.cart = loggedInUser.cart || [];
      loggedInUser.cart.push(product);
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

      let users: User[] = JSON.parse(localStorage.getItem('users') ?? '[]');
      users = users.map((user: User) => user.email === loggedInUser.email ? loggedInUser : user);
      localStorage.setItem('users', JSON.stringify(users));

      userStatus.next(loggedInUser); // Emitir estado del usuario actualizado
      this.showAlert('Producto añadido al carrito');
    } else {
      alert('Por favor, inicia sesión para agregar productos al carrito.');
      this.router.navigate(['/Login']);
    }
  }

  /**
   * Muestra un mensaje de alerta.
   * @param message Mensaje de la alerta.
   */
  showAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}
