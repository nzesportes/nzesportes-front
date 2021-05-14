import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsNewComponent } from './brands-new.component';

describe('BrandsNewComponent', () => {
  let component: BrandsNewComponent;
  let fixture: ComponentFixture<BrandsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
