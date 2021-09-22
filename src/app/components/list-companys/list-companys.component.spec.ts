import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanysComponent } from './list-companys.component';

describe('ListCompanysComponent', () => {
  let component: ListCompanysComponent;
  let fixture: ComponentFixture<ListCompanysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
