import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthnErrorComponent } from './authn-error.component';

describe('AuthnErrorComponent', () => {
  let component: AuthnErrorComponent;
  let fixture: ComponentFixture<AuthnErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthnErrorComponent]
    });
    fixture = TestBed.createComponent(AuthnErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
