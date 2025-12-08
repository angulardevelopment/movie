import {Directive,HostBinding,HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  @HostBinding('class.highlight')
  highlight: boolean = false;

  @HostListener('mouseover')
  onMouseOver(): void {
    this.highlight = true;
  }

  @HostListener('mouseout')
  onMouseOut(): void {
    this.highlight = false;
  }
}
