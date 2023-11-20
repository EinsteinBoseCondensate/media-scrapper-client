import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth0JwtService } from "../services/auth0-jwt-service";
import { environment as env } from '../../../environments/environment';

export class Auth0AuthnExtensionHttpInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(this.isUrlBindedToHeaderAppendNeed(req.url))
            req.headers.append('Authorization', `Bearer ${Auth0JwtService.rawToken}`);

        return next.handle(req);
    }
    isUrlBindedToHeaderAppendNeed(url: string): boolean{
        return !!env.authExtensionHttpInterceptor.allowedList.filter(address => {
            if(address.includes('/*')) {
                return url.startsWith(address.replace('/*', ''))
            }
            return address === url;
        }).length
    }
}