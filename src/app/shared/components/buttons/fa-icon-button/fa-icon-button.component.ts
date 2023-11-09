import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-fa-icon-button',
  templateUrl: './fa-icon-button.component.html',
  styleUrls: ['./fa-icon-button.component.scss']
})
export class FaIconButtonComponent implements OnInit {
  @Input()
  public title: string = "";
  @Input()
  public isLoading: boolean = false;
  @Input()
  public icon: IconName = 'search';
  @Input()
  public sizeClass: string = "size-5";
  @Input()
  public iconType: IconPrefix = 'fas';
  constructor() { }

  ngOnInit(): void {
  }
  
}
