import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Loading } from '../../popups/loading/loading';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private overlayRef:OverlayRef|null = null
  constructor(
    private overlay:Overlay
  ){}
  openLoading(){
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      });
      const commponentPortal = new ComponentPortal(Loading)
      this.overlayRef.attach(ComponentPortal)
    }
  }
  closeLoading(){
    if (this.overlayRef) {
      this.overlayRef.dispose() 
      this.overlayRef = null
    }
  }
  loadingIsOpen():boolean{
    return this.overlayRef !== null
  } 
}
