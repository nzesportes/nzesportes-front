import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {CartService} from '../../services/cart.service';
import {Store} from '@ngrx/store';
import {CartState, CartStateReducer} from '../../redux/cart/cart.state';
import {AddItemCart, CartActionsType} from '../../redux/cart/cart.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  avaliacao = 3.8;
  positionImage = 0;

  shipping: any;

  dynamicSlides = [
    {
      id: 1,
      fullImage: 'assets/images/nike-preto.jpg',
      thumb: 'assets/images/nike-preto-thumb.jpg'
    },
    {
      id: 2,
      fullImage: 'assets/images/nike-vermelho.jpg',
      thumb: 'assets/images/nike-vermelho-thumb.jpg'
    },
    {
      id: 3,
      fullImage: 'assets/images/tenis-vermelho.jpg',
      thumb: 'assets/images/tenis-vermelho-thumb.jpg'
    },
    {
      id: 4,
      fullImage: 'assets/images/vans-vinho.jpg',
      thumb: 'assets/images/vans-vinho-thumb.jpg'
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    margin: 0,
    autoplay: false,
    autoplaySpeed: 700,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  };

  constructor(
    private cartService: CartService,
    private store: Store<CartState>,
  ) {
  }

  ngOnInit(): void {
  }


  changeImage(index: number): void {
    this.positionImage = index;
  }

  calculate(): void {
    this.shipping = { dias: 4, valor: 27.50};
  }

  addToCart(id: string): void {
    const product = {
      id: 1,
      img: 'assets/images/product.jpg',
      name: 'Camiseta NBL',
      price: 129.00,
      qtde: 3
    };

    this.store.dispatch(new AddItemCart(product));

    const product1 = {
      id: 2,
      img: 'assets/images/product.jpg',
      name: 'Camiseta NBL',
      price: 129.00,
      qtde: 3
    };

    this.store.dispatch(new AddItemCart(product1));
    /*this.store.dispatch({
      type: CartActionsType.ADD_ITEM_CART,
      payload: product
    });*/
    // this.cartService.addToCart(product);

  }
}
