import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { BaseResponse } from "../models/backend/base.response.model";
import { Auth0UserDataRequest } from "../models/auth0/auth0-user-data.request";


@Injectable({
    providedIn: 'root',
})
export class Auth0SubmitDataService{

    private readonly auth0ModuleEndpoint: string = "/auth0";

    constructor(private readonly apiService: ApiService) {}

    public updateData(request: Auth0UserDataRequest): Observable<BaseResponse>{
        return this.apiService.post(this.auth0ModuleEndpoint + "/update-data", request);
    }
    
}