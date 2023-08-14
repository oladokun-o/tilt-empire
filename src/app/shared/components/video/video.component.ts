import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  video: string = 'https://tiltempire.b-cdn.net/eatahthon.mp4';
  volume: number = 0.2;
  controls: boolean = false;
  loop: boolean = true;

  constructor (
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log(this.video);
  }

}
