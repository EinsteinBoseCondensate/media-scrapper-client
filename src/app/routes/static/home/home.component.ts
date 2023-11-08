
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { unsubscribeIfValid } from '../../../shared/services/subscriptions.helper';
import { VideosService } from 'src/app/shared/services/videos.service';
import { VideosRequest } from 'src/app/shared/models/backend/videos/videos.request';
import { Video } from 'src/app/shared/models/backend/videos/video.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '@auth0/auth0-angular';
import { MyVideosService } from 'src/app/shared/services/my-videos.service';
import { MyVideo, buildMyVideoFromVideo } from 'src/app/shared/models/backend/my-videos/my-videos.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public videoSearchSubscription: Subscription = new Subscription();
  public likeVideoSubscription: Subscription = new Subscription();
  public dislikeVideoSubscription: Subscription = new Subscription();
  public myVideosSubscription: Subscription = new Subscription();
  public isAuthenticatedSubscription: Subscription = new Subscription();
  public videosRequest: VideosRequest = {
    userInput: ''
  };

  private lastUserInput = '';

  public selectedVideo?: Video;

  public videos?: Video[] = [
    {
      "url": "https://www.youtube.com/embed/TouU2G9p7vU",
      "title": "ELDEN RING PS5 Walkthrough Gameplay Part 1 - INTRO (FULL GAME)",
      "thumbnailUrl": "https://i.ytimg.com/vi/TouU2G9p7vU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC73gLVugYQaFJmthlh6VpxDnoSzg",
      "durationFormatted": "00:56:22",
      "channelTitle": "theRadBrad"
    },
    {
      "url": "https://www.youtube.com/embed/4dQYuhXwCc4",
      "title": "Placidusax is EASY | Elden Ring #53",
      "thumbnailUrl": "https://i.ytimg.com/vi/4dQYuhXwCc4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDPVXTDlfNuRv6ogfRK-odF86BUHg",
      "durationFormatted": "00:01:37",
      "channelTitle": "CarbotAnimations"
    },
    {
      "url": "https://www.youtube.com/embed/R18vgp7BCS4",
      "title": "Perhaps The DUMBEST CHEATER in ELDEN RING",
      "thumbnailUrl": "https://i.ytimg.com/vi/R18vgp7BCS4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDGb4fmUqD0aul-HJsjSmZ7BeUvOA",
      "durationFormatted": "00:11:13",
      "channelTitle": "Steelovsky"
    },
    {
      "url": "https://www.youtube.com/embed/m7XFl1bMeew",
      "title": "Elden Ring Lore To Study and Relax To",
      "thumbnailUrl": "https://i.ytimg.com/vi/m7XFl1bMeew/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8yoGGqaIg7rLY3BISbsFMa1ncZA",
      "durationFormatted": "11:46:46",
      "channelTitle": "Square Table Gaming"
    },
    {
      "url": "https://www.youtube.com/embed/gZmWWnMeIfE",
      "title": "Can I beat Elden Ring as the Grim Reaper?",
      "thumbnailUrl": "https://i.ytimg.com/vi/gZmWWnMeIfE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD5VVIeuVWGplM1qaWlbuYBT5CqKg",
      "durationFormatted": "00:25:17",
      "channelTitle": "Doom Wolf"
    },
    {
      "url": "https://www.youtube.com/embed/RB2sMEs7gyM",
      "title": "Ranking All 91 Elden Ring Ashes of War From Worst to Best (Patch 1.10)",
      "thumbnailUrl": "https://i.ytimg.com/vi/RB2sMEs7gyM/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDGno1xSdFNGFluDg-E5h0OHclrXw",
      "durationFormatted": "01:02:58",
      "channelTitle": "Rusty."
    },
    {
      "url": "https://www.youtube.com/embed/Dfl5SW5F3nc",
      "title": "Testing EVERY HALBERD for your relaxation (Elden Ring)",
      "thumbnailUrl": "https://i.ytimg.com/vi/Dfl5SW5F3nc/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAciIyBMMS-z1Svwgh2GxrTZP_bTw",
      "durationFormatted": "00:27:11",
      "channelTitle": "monk"
    },
    {
      "url": "https://www.youtube.com/embed/NLdZ8Zex1cw",
      "title": "The Beginner's Guide to Elden Ring",
      "thumbnailUrl": "https://i.ytimg.com/vi/NLdZ8Zex1cw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBb3egiwCDu-nagQcMcg4NBy8mKoQ",
      "durationFormatted": "00:18:30",
      "channelTitle": "VaatiVidya"
    },
    {
      "url": "https://www.youtube.com/embed/Z4U5UpnyFW8",
      "title": "Can ANY Boss Break Through The Ultimate Divine Tower? - Elden Ring",
      "thumbnailUrl": "https://i.ytimg.com/vi/Z4U5UpnyFW8/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCsBRTOgcWHOvvdIFZDPOCNSb73xA",
      "durationFormatted": "00:44:19",
      "channelTitle": "BjornTheBear"
    },
    {
      "url": "https://www.youtube.com/embed/1HneC_tuv9g",
      "title": "I Tried \"The Most Broken Weapon\" in Elden Ring",
      "thumbnailUrl": "https://i.ytimg.com/vi/1HneC_tuv9g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDBSHTIS_PHjDJhfjquigQHujbcvA",
      "durationFormatted": "00:15:18",
      "channelTitle": "Quoppp"
    },
    {
      "url": "https://www.youtube.com/embed/ZpHIhJO8Sws",
      "title": "The life of an ELDEN RING noob",
      "thumbnailUrl": "https://i.ytimg.com/vi/ZpHIhJO8Sws/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDmWGTcVfCItJdiEVNRD_waljHnvw",
      "durationFormatted": "00:15:44",
      "channelTitle": "Andrewjrt"
    },
    {
      "url": "https://www.youtube.com/embed/72w8IGdQHPg",
      "title": "Elden Ring: NEW TOP 8 MOST FUN & BROKEN BUILDS!! ᴘᴀᴛᴄʜ \uD835\uDFF7.\uD835\uDFF7\uD835\uDFF6",
      "thumbnailUrl": "https://i.ytimg.com/vi/72w8IGdQHPg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSHxgmZmTp4sWtnvjS7hjQ5TOCDg",
      "durationFormatted": "00:15:49",
      "channelTitle": "EldenKing"
    },
    {
      "url": "https://www.youtube.com/embed/k3BEwI06RkQ",
      "title": "Elden Ring - It's hidden in plain sight",
      "thumbnailUrl": "https://i.ytimg.com/vi/k3BEwI06RkQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCOTL6S6eSUdnMGsLxjnROxc1lKig",
      "durationFormatted": "00:10:16",
      "channelTitle": "Zullie the Witch"
    },
    {
      "url": "https://www.youtube.com/embed/jzQRIDLGADY",
      "title": "We DESTROYED Elden Ring as The Admirals (One Piece Seamless)",
      "thumbnailUrl": "https://i.ytimg.com/vi/jzQRIDLGADY/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAcgp4UTOOVNjlr85dyvYovKds3BA",
      "durationFormatted": "00:24:12",
      "channelTitle": "Cloud"
    },
    {
      "url": "https://www.youtube.com/embed/TUvz1PEqlSw",
      "title": "Antes de que Gastes - ELDEN RING",
      "thumbnailUrl": "https://i.ytimg.com/vi/TUvz1PEqlSw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBYDKItGCMacvCpwyyFJXg4IzqGBA",
      "durationFormatted": "00:19:23",
      "channelTitle": "Merluso"
    },
    {
      "url": "https://www.youtube.com/embed/Si-TkIIURWw",
      "title": "10 Sorceress Sellens Vs Bosses - Elden Ring",
      "thumbnailUrl": "https://i.ytimg.com/vi/Si-TkIIURWw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD_DSxahgjQFQJqaPIolyM0zFOQ0g",
      "durationFormatted": "00:25:28",
      "channelTitle": "EldenRing Fights"
    },
    {
      "url": "https://www.youtube.com/embed/NvVdU2PZXMg",
      "title": "I streamed until I beat Elden Ring. It was a mistake.",
      "thumbnailUrl": "https://i.ytimg.com/vi/NvVdU2PZXMg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBqHqQt1c5VjlqSfPZgSGmFeahZkw",
      "durationFormatted": "00:59:28",
      "channelTitle": "Ludwig"
    },
    {
      "url": "https://www.youtube.com/embed/5Lzl5TWRKnU",
      "title": "Elden Ring - Why did he do this to himself?",
      "thumbnailUrl": "https://i.ytimg.com/vi/5Lzl5TWRKnU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDaWo_P5LUhs2j7l7RlC7yp2mhoCA",
      "durationFormatted": "00:02:26",
      "channelTitle": "Zullie the Witch"
    },
    {
      "url": "https://www.youtube.com/embed/zjhE3j4CpXc",
      "title": "Elden Ring - All Bosses With Cutscenes (NO DAMAGE) [2K 60FPS]",
      "thumbnailUrl": "https://i.ytimg.com/vi/zjhE3j4CpXc/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAIR92IHT6sSz0Uv73qw3v8QzTcnA",
      "durationFormatted": "00:53:09",
      "channelTitle": "DarkPlayerBrett"
    },
    {
      "url": "https://www.youtube.com/embed/_Svc61XU4Wk",
      "title": "ELDEN RING Gameplay Walkthrough Part 1 FULL GAME PS5 - No Commentary",
      "thumbnailUrl": "https://i.ytimg.com/vi/_Svc61XU4Wk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCRzpZtoYuCeHLYhg5yh60coY9qHQ",
      "durationFormatted": "",
      "channelTitle": "MKIceAndFire"
    }
  ];

  public myVideos: MyVideo[] = [];

  constructor(private readonly videosService: VideosService,
    private readonly domSanitizer: DomSanitizer,
    public readonly auth0Service: AuthService,
    private readonly myVideosService: MyVideosService) {
  }
  ngOnInit(): void {
    this.isAuthenticatedSubscription = this.auth0Service.isAuthenticated$
      .subscribe(isAuthenticated => {
        if (!isAuthenticated)
          return;

        unsubscribeIfValid(this.myVideosSubscription);
        this.myVideosSubscription = this.myVideosService.getMyVideos()
        .subscribe(response => {
          if (!response.isSuccess)
            return;

          this.myVideos = response.items;
        })

      })
  }

  search(): void {

    unsubscribeIfValid(this.videoSearchSubscription);

    if (this.videosRequest.userInput !== this.lastUserInput)
      this.videosRequest.continuationToken = '';

    this.lastUserInput = this.videosRequest.userInput;

    this.videoSearchSubscription = this.videosService.getVideos(this.videosRequest)
      .subscribe(response => {
        if (!response.isSuccess)
          return;

        this.videos = response.result.items;
        this.videosRequest.continuationToken = response.result.continuationToken;
      });
  }

  videoSelected(video: Video | undefined): void {
    if (!video)
      return;

    video.sanitizedUrl ||= this.domSanitizer.bypassSecurityTrustResourceUrl(video.url)
    this.selectedVideo = video;
  }

  likeVideo(video: Video | undefined) {
    if (!video)
      return;

    const myVideo = buildMyVideoFromVideo(video);
    this.likeVideoSubscription = this.myVideosService.addToMyVideos(myVideo)
      .subscribe(response => {
        if (!response.isSuccess)
          return;

          this.myVideos.push(myVideo);
          
      })
  }

  dislikeVideo(video: Video | undefined) {
    if (!video)
      return;

    const myVideo = this.myVideos.filter(item => item.url === video.url)[0];
    this.dislikeVideoSubscription = this.myVideosService.removeFromMyVideos(myVideo.id)
      .subscribe(response => {
        if (!response.isSuccess)
          return;

          this.myVideos = this.myVideos.filter(item => item.id !== myVideo.id);

      })
  }

  isSelectedVideoAmongMyVideos(){
    if(!this.selectedVideo)
      return false;
    return this.myVideos.filter(video => video.url === this.selectedVideo?.url).length;
  }

  ngOnDestroy(): void {
    unsubscribeIfValid(this.videoSearchSubscription);
  }
}
