import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../../shared/services/contact.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Contact} from '../../../shared/models/contact.model';

@Component({
  selector: 'app-contact-us-details',
  templateUrl: './contact-us-details.component.html',
  styleUrls: ['./contact-us-details.component.scss']
})
export class ContactUsDetailsComponent implements OnInit {

  private id = '';
  public contact: Contact | undefined;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams.id;
    });
    this.getContactUs();
  }

  getContactUs(): void {
    this.contactService.getById(this.id)
      .subscribe(response => {
        this.contact = response;
      }, error => {
        console.log(error);
      });
  }

  markRead(): void {
    this.contactService.updateRead(this.id)
      .subscribe(response => {
        this.contact = response;
      }, error => {
        console.log(error);
      });
  }
}
