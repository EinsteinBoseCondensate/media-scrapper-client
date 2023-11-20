import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthnExpiredComponent } from './authn-expired.component';

describe('AuthnExpiredComponent', () => {
  let component: AuthnExpiredComponent;
  let fixture: ComponentFixture<AuthnExpiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthnExpiredComponent]
    });
    fixture = TestBed.createComponent(AuthnExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
