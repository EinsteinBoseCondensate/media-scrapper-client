import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Auth0JwtService } from 'src/app/shared/services/auth0-jwt-service';
import { Auth0SubmitDataService } from 'src/app/shared/services/auth0-submit-data.service';
import { unsubscribeIfValid } from 'src/app/shared/services/subscriptions.helper';

@Component({
  selector: 'app-authn-extension',
  templateUrl: './authn-extension.component.html',
  styleUrls: ['./authn-extension.component.scss']
})
export class AuthnExtensionComponent implements OnDestroy{

  public userDataFormGroup: FormGroup = new FormGroup(
    {
      firstName: new FormControl(),
      lastName: new FormControl()
    },
  );

  private updateDataSubscription = new Subscription();

  constructor(private readonly auth0SubmitDataService: Auth0SubmitDataService){ }

  public submitData(){
    unsubscribeIfValid(this.updateDataSubscription);

    this.updateDataSubscription = this.auth0SubmitDataService.updateData({
      firstName: this.userDataFormGroup.controls.firstName.value,
      lastName: this.userDataFormGroup.controls.lastName.value
    }).subscribe(response => {
      if(!response.isSuccess)
        return;

      window.location.href = Auth0JwtService.getContinueEndpoint();
    })
  }

  ngOnDestroy(): void {
    unsubscribeIfValid(this.updateDataSubscription);
  }
}
