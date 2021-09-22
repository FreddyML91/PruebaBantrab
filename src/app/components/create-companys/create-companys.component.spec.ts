import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanysComponent } from './create-companys.component';

describe('CreateCompanysComponent', () => {
  let component: CreateCompanysComponent;
  let fixture: ComponentFixture<CreateCompanysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompanysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
