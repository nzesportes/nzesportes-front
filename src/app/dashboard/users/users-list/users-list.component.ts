import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {Brand} from '../../../shared/models/brand.model';
import {BrandPage} from '../../../shared/models/pagination-model/brand-page.model';
import {User} from '../../../shared/models/user.model';
import {UserPage} from '../../../shared/models/pagination-model/user-page.model';
import {PaginationService} from '../../../shared/services/pagination.service';
import {take} from 'rxjs/operators';
import {mapRolesTranslate} from '../../../shared/enums/role.enum';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  content: UserPage | undefined;
  hasError!: boolean;
  mapRolesTranslate = mapRolesTranslate;

  constructor(
    private userService: UserService,
    public paginationService: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.paginationService.initPagination();
    this.getAllUsers(10, this.paginationService.page);
  }

  getAllUsers(size: number, page: number, search?: string): void {
    this.userService.getAdmins(size, page)
      .pipe(take(1))
      .subscribe(r => {
        this.users = r.content;
        this.content = r;
        console.log(r);
        this.paginationService.getPageRange(this.content.totalElements);
      }, () => {
        this.hasError = true;
      });
  }

  updateIndex(index: number): void {
    this.getAllUsers(10, index);
    this.paginationService.page = index;
  }

  onChangeFilter(search: string): void {
    this.paginationService.page = 0;
    this.getAllUsers(10, 0, search);
  }

  getTotalRoles(u: User): number {
    if (u.roles?.length) {
      return u.roles.length;
    }
    return 0;
  }

}
