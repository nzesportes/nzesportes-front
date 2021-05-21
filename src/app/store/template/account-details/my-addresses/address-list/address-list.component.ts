import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {


  addresses = [
    {
      rua: 'Rua São Florêncio',
      numero: 1464,
      complemento: 'Bloco A2 apto 34',
      bairro: 'Cangaíba',
      cidade: 'São Paulo',
      uf: 'SP',
      cep: '03733-020'
    },
    {
      rua: 'Rua Cecília Iter',
      numero: 185,
      complemento: 'Casa 7',
      bairro: 'Itaquera',
      cidade: 'São Paulo',
      uf: 'SP',
      cep: '08240-730'
    },
    {
      rua: 'Rua Mário Bastos',
      numero: 38,
      complemento: '',
      bairro: 'Jardim Mercedes',
      cidade: 'Ferraz de Vasconcelos',
      uf: 'SP',
      cep: '08541-240'
    },
    {
      rua: 'Rua Sena Madureira',
      numero: 1500,
      complemento: '4ºANDAR STI ',
      bairro: 'Vila Clementino',
      cidade: 'São Paulo',
      uf: 'SP',
      cep: '03733-020'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
