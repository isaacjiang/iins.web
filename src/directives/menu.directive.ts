import {ViewContainerRef, Directive,ElementRef,Renderer} from '@angular/core';

@Directive({
  selector: 'iins-directive-menu',
})
export class MenuDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
