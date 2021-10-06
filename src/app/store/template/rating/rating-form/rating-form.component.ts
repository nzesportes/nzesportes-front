import { Component, OnInit } from '@angular/core';
import {RatingService} from '../../../../shared/services/rating.service';
import {take} from 'rxjs/operators';
import {RatingSaveTO} from '../../../../shared/models/rating-save-to.model';
import {RatingUpdateTO} from '../../../../shared/models/rating-update-to.model';
import {Rating} from '../../../../shared/models/rating.model';
import {RatingPage} from '../../../../shared/models/pagination-model/rating-page.model';
import {PaginationService} from '../../../../shared/services/pagination.service';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.scss']
})
export class RatingFormComponent implements OnInit {

  ratingSaveTO: RatingSaveTO = {
    purchaseId: '',
    rate: 0,
    comment: '',
    productId: ''
  };

  ratingUpdateTO: RatingUpdateTO = {
    id: '',
    rate: 0,
    comment: ''
  };

  content!: RatingPage;
  ratings: Rating[] = [];

  constructor(
    private ratingService: RatingService,
    private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.getRatings(this.paginationService.page, 10);

    this.ratingSaveTO.purchaseId = '22f12b5f-e25e-4cdc-957e-68418f10b6d2';
    this.ratingSaveTO.rate = 4;
    this.ratingSaveTO.comment = 'TESTE';
    this.ratingSaveTO.productId = 'b243d01c-6239-4b64-babc-0f471952ac26';

    this.ratingUpdateTO.id = '58e79af2-168f-4cc5-990e-fd5cf851d594';
    this.ratingUpdateTO.rate = 3;
    this.ratingUpdateTO.comment = 'Teste';
  }

  // FUNCIONOU
  save(): void {
    this.ratingService.create(this.ratingSaveTO)
      .pipe(take(1))
      .subscribe(response => {
        console.warn('CREATE', response);
      }, error => {
        console.error('CREATE', error);
      });
  }

  // FUNCIONOU
  ver(): void {
    this.ratingService.getRatingById(this.ratingUpdateTO.id)
      .pipe(take(1))
      .subscribe(response => {
        console.warn('BY ID', response);
      }, error => {
        console.error('BY ID', error);
      });
  }

  // FUNCIONOU
  update(): void {
    this.ratingService.update(this.ratingUpdateTO)
      .pipe(take(1))
      .subscribe(response => {
        console.warn('UPDATE', response);
      }, error => {
        console.error('UPDATE', error);
      });
  }

  // FUNCIONOU COMO ADMIN
  getRatings(page: number, size: number): void {
    this.ratingService.getRatings(page, size)
      .pipe(take(1))
      .subscribe(response => {
        this.ratings = response.content;
        this.content = response;
        this.paginationService.getPageRange(this.content.totalElements);
        console.warn('GET RATINGS', response);
      }, error => {
        console.error('GET RATINGS', error);
      });
  }

  // FUNCIONOU
  getRatingsByProductId(): void {
    this.ratingService.getRatingsByProductId(this.ratingSaveTO.productId, 0, 10)
      .pipe(take(1))
      .subscribe(response => {
        console.warn('GET RATINGS BY PRODUCT ID', response);
      }, error => {
        console.error('GET RATINGS BY PRODUCT ID', error);
      });
  }

  // TIRAR MENSAGEM DE ERRO
  deleteById(): void {
    this.ratingService.deleteById(this.ratingUpdateTO.id)
      .pipe(take(1))
      .subscribe(response => {
        console.warn('DELETE', response);
      }, error => {
        console.error('DELETE', error);
      });
  }
}
