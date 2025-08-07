import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class Loading implements OnDestroy{
  ngOnDestroy(): void {
    console.log('mikatona')
  }
}
