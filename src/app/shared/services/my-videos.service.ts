import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { MyVideo } from "../models/backend/my-videos/my-videos.model";
import { Injectable } from "@angular/core";
import { MyVideosResponse } from "../models/backend/my-videos/my-videos.response";
import { CreateVideoResponse } from "../models/backend/my-videos/create-video.response";
import { DeleteVideoRequest } from "../models/backend/my-videos/delete-video.request";


@Injectable({
    providedIn: 'root',
})
export class MyVideosService{

    private readonly videosEndpoint: string = "/user-videos";

    constructor(private readonly apiService: ApiService) {}

    public getMyVideos(): Observable<MyVideosResponse>{
        return this.apiService.get(this.videosEndpoint + "/read-by-user");
    }
    
    public addToMyVideos(video: MyVideo): Observable<CreateVideoResponse>{
        return this.apiService.post(this.videosEndpoint + "/create", video)
    }

    public removeFromMyVideos(id: string): Observable<CreateVideoResponse>{
        return this.apiService.post(this.videosEndpoint + "/delete", this.buildDeleteRequestFromString(id))
    }

    private buildDeleteRequestFromString(id: string): DeleteVideoRequest{
        return {
            id
        };
    }
}