import {ViewContainerRef, Directive} from '@angular/core';

@Directive({
  selector: 'iins-directive-content',
})
export class ContentDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
