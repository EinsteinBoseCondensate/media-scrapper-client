
import { Video } from "../videos/video.model";

export interface MyVideo extends Video {
    videoId: string;
    id: string
}

export const buildMyVideoFromVideo = (video: Video): MyVideo => ({
    ...video,
    id: window.crypto.randomUUID(),
    videoId: video.url.split('/').reverse()[0]
});

