import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { VideoSearchResult } from "../models/backend/videos/videoSearchResult.model";
import { VideosRequest } from "../models/backend/videos/videos.request";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
})
export class VideosService {

    private readonly videosEndpoint: string = "/videos";

    constructor(private readonly apiService: ApiService) { }

    public getVideos(request: VideosRequest): Observable<VideoSearchResult> {
        return this.apiService.post(this.videosEndpoint, request);
    }
}