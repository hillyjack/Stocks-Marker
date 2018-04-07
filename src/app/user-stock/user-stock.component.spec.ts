import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStockComponent } from './user-stock.component';

describe('UserStockComponent', () => {
  let component: UserStockComponent;
  let fixture: ComponentFixture<UserStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
