import { Router } from "@angular/router";
import { JwtClaims } from "../models/auth0/jwt-claims";
import { jwtDecode } from 'jwt-decode';
import { environment as env } from '../../../environments/environment';

export class Auth0JwtService{
    static jwtClaims: JwtClaims;
    static rawToken: string;
    static state: string;
    static persisted: boolean = false;
    static tryPersist(state: string, token: string, router: Router){
        if (this.persisted)
            return true;
        try {
            const tokenIsNullOrUndefined = !token;
            const stateIsNullOrUndefined = !state;
            const session_token: string = tokenIsNullOrUndefined ? localStorage.getItem('jwt')! : token;
            const session_state: string = stateIsNullOrUndefined ? localStorage.getItem('state')! : state;
            this.persisted = true;
            this.jwtClaims = jwtDecode(session_token);
            this.rawToken = session_token;
            this.state = session_state;
            const expirationDifference = this.jwtClaims.exp * 1000 - Date.now();
            const timeForTokenToExpire = expirationDifference > 0 ? expirationDifference : 0;
            setTimeout(() => {
                router.navigate(['/authn-expired']);
            }, timeForTokenToExpire);
            if (!tokenIsNullOrUndefined && !stateIsNullOrUndefined) {
                localStorage.setItem('jwt', session_token);
                localStorage.setItem('state', session_state);
            }

        } catch {
            this.persisted = false;
        }
        return this.persisted;
    }

    static getContinueEndpoint() {
        return `https://${env.auth.domain}/continue?state=${this.state}`;
    }
}