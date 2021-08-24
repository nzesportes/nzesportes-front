import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../shared/services/customer.service';
import {map, take} from 'rxjs/operators';
import {Customer} from '../../../shared/models/customer.model';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.scss']
})
export class ClientsViewComponent implements OnInit {
  public customer!: Customer;
  public user!: User;
  hasError!: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.route.params.pipe(
      map(p => p.id),
      take(1)
    ).subscribe(id => {
      this.customerService.getById(id)
        .pipe(take(1))
        .subscribe((c: Customer) => {
          this.customer = c;
        }, () => {
          this.hasError = true;
        });
    });
  }

}
