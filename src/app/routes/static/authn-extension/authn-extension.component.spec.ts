import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthnExtensionComponent } from './authn-extension.component';

describe('AuthnExtensionComponent', () => {
  let component: AuthnExtensionComponent;
  let fixture: ComponentFixture<AuthnExtensionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthnExtensionComponent]
    });
    fixture = TestBed.createComponent(AuthnExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
