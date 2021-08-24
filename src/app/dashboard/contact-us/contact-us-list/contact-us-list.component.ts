import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../../shared/services/contact.service';
import {PaginationService} from '../../../shared/services/pagination.service';
import {take} from 'rxjs/operators';
import {ContactPage} from '../../../shared/models/pagination-model/contact-page.model';
import {Contact} from '../../../shared/models/contact.model';

@Component({
  selector: 'app-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.scss']
})
export class ContactUsListComponent implements OnInit {

  contacts: Contact[] = [];
  content: ContactPage | undefined;
  hasError!: boolean;

  constructor(
    private contactService: ContactService,
    public paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.getAllContactUs(10, this.paginationService.page);
  }

  getAllContactUs(size: number, page: number, read?: boolean): void {
    this.contactService.getAll(size, page, read)
      .pipe(take(1))
      .subscribe(response => {
          this.contacts = response.content;
          this.content = response;
          this.paginationService.getPageRange(this.content.totalElements);
        }, () => {
          this.hasError = true;
        }
      );
  }

  updateIndex(index: number): void {
    this.getAllContactUs(10, index);
    this.paginationService.page = index;
  }
}
