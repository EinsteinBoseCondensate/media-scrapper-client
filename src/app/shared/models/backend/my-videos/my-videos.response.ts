import { BaseResponse } from "../base.response.model";
import { MyVideo } from "./my-videos.model";

export interface MyVideosResponse extends BaseResponse{
    items: MyVideo[]
}