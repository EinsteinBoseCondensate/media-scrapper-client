import { BaseResponse } from "../base.response.model";
import { MediaSearchResult } from "./mediaSearchResult.model";
import { Video } from "./video.model";

export interface VideoSearchResult extends BaseResponse {
    result: MediaSearchResult<Video>
}