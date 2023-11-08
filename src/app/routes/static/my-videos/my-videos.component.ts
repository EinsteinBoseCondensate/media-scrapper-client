import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MyVideo } from 'src/app/shared/models/backend/my-videos/my-videos.model';
import { MyVideosService } from 'src/app/shared/services/my-videos.service';
import { unsubscribeIfValid } from 'src/app/shared/services/subscriptions.helper';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss']
})
export class MyVideosComponent implements OnInit, OnDestroy {

  public myVideos: MyVideo[] = [];
  public selectedVideo?: MyVideo;
  public selectedVideoIndex: number = -1;
  private myVideosSubscription: Subscription = new Subscription();
  constructor(private readonly myVideosService: MyVideosService,
    private readonly domSanitizer: DomSanitizer) { }

  removeVideo(video: MyVideo | undefined, index: number) {
    if (!video)
      return;

    this.myVideosService.removeFromMyVideos(video.id)
      .subscribe(response => {
        if (!response.isSuccess)
          return;

        this.myVideos.splice(index, 1);

        if (this.selectedVideo?.id === video.id)
          this.selectedVideo = undefined;
      })
  }

  videoSelected(video: MyVideo | undefined, index: number): void {
    if (!video)
      return;

    video.sanitizedUrl ||= this.domSanitizer.bypassSecurityTrustResourceUrl(video.url)
    this.selectedVideo = video;
    this.selectedVideoIndex = index;
  }

  ngOnInit(): void {
    unsubscribeIfValid(this.myVideosSubscription);
    this.myVideosSubscription = this.myVideosService.getMyVideos()
      .subscribe(response => {
        if (!response.isSuccess)
          return;

        this.myVideos = response.items;
      });
  }

  ngOnDestroy(): void {
    unsubscribeIfValid(this.myVideosSubscription);
  }
}
