import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Auth0JwtService } from "../services/auth0-jwt-service";

export const auth0ActionJwtAuthGuard: CanActivateFn =
(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) => {
    const token = route.queryParams.session_token;
    const auth0State = route.queryParams.state;
    const router = inject(Router);
    if(!Auth0JwtService.tryPersist(token, auth0State, router)){
        router.navigate(['/authn-error']);
        return false;
    }
    return true;
}
