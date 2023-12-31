import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconName } from '@fortawesome/fontawesome-svg-core';
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
  public isMyVideosCallLoading: boolean = false;
  public collapseTitle: "Expand" | "Collapse" = "Collapse";
  public collapseIcon: IconName = "angle-up"
  public collapsedIframeClass: boolean = false;
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

  unselectVideo(){
    this.selectedVideo = undefined;
    this.collapseTitle = "Collapse";
    this.collapseIcon = "arrow-up";
    this.collapsedIframeClass = false;
  }
  toggleCollapsedSelectedVideo(){
    this.collapsedIframeClass = !this.collapsedIframeClass;
    this.collapseTitle = this.collapseTitle === "Expand" ? "Collapse" : "Expand";
    this.collapseIcon = this.collapseIcon === "arrow-down" ? "arrow-up" : "arrow-down";
  }

  ngOnInit(): void {
    this.isMyVideosCallLoading = true;
    unsubscribeIfValid(this.myVideosSubscription);
    this.myVideosSubscription = this.myVideosService.getMyVideos()
      .subscribe(response => {
        if (!response.isSuccess)
          return;

        this.myVideos = response.items;
        this.isMyVideosCallLoading = false;
      });
  }

  ngOnDestroy(): void {
    unsubscribeIfValid(this.myVideosSubscription);
  }
}
