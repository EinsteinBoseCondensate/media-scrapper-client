
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

  public videos?: Video[];
  public loadingVideos: boolean = false;

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

  onNearEndScroll(): void {
    console.log('entered')
    if (!this.videos?.length || this.loadingVideos)
      return;
    console.log('going to search')
    this.search(false);
  }

  search(fromSearch: boolean = true): void {
    this.loadingVideos = true;
    unsubscribeIfValid(this.videoSearchSubscription);

    if (fromSearch) {
      this.videosRequest.continuationToken = '';
      this.lastUserInput = this.videosRequest.userInput;
    }

    this.videoSearchSubscription = this.videosService.getVideos(this.videosRequest)
      .subscribe(response => {
        this.loadingVideos = false;
        if (!response.isSuccess)
          return;

        if(fromSearch){
          this.videos = response.result.items;
        }
        else {
          response.result.items.forEach(item => this.videos?.push(item))
        }
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

  isSelectedVideoAmongMyVideos() {
    if (!this.selectedVideo)
      return false;
    return this.myVideos.filter(video => video.url === this.selectedVideo?.url).length;
  }

  ngOnDestroy(): void {
    unsubscribeIfValid(this.myVideosSubscription);
    unsubscribeIfValid(this.likeVideoSubscription);
    unsubscribeIfValid(this.dislikeVideoSubscription);
    unsubscribeIfValid(this.videoSearchSubscription);
    unsubscribeIfValid(this.isAuthenticatedSubscription);
  }
}
