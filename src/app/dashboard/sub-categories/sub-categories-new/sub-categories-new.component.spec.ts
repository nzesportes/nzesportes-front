import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriesNewComponent } from './sub-categories-new.component';

describe('SubCategoriesNewComponent', () => {
  let component: SubCategoriesNewComponent;
  let fixture: ComponentFixture<SubCategoriesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoriesNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoriesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
