import { SafeResourceUrl } from "@angular/platform-browser";

export interface Video {
    url: string;
    title: string;
    thumbnailUrl: string;
    durationFormatted: string;
    channelTitle: string;
    sanitizedUrl?: SafeResourceUrl
}