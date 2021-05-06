import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  emptyCart = false;
  teste = 0;

  itemsCart = [
    {
      id: 1,
      src: 'assets/images/product.jpg',
      name: 'Camiseta NBA',
      price: 129.00,
      qtde: 1
    },
    {
      id: 2,
      src: 'assets/images/product.jpg',
      name: 'Camiseta NBL',
      price: 129.00,
      qtde: 3
    },
    {
      id: 3,
      src: 'assets/images/product.jpg',
      name: 'Camiseta Rugby',
      price: 129.00,
      qtde: 2
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  plusItem(qtde: number): void {
    qtde++;
  }

  minusItem(qtde: number): void {
    qtde--;
  }

  calculateTotal(): number {
    let total = 0;
    this.itemsCart.forEach(item => {
      total += (item.qtde * item.price);
    });
    return total;
  }
}
