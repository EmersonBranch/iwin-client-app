import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild('swiper') swiper: ElementRef | undefined;

  constructor() { }

  ngOnInit() {
  }

  goNext(){
    this.swiper?.nativeElement.swiper.slideNext();
  }

}
