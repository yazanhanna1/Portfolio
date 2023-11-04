import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { tabAnimation } from './tab-animations';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss', '../../styles.scss'],
  animations: [tabAnimation],
})
export class TabComponent {
  @Input() tabId = '';
  @Input() tabTitle = '';
  @Input() tabContent: SafeHtml = '';
  @Output() tabClosed = new EventEmitter<string>();

  @ViewChild('tab') tab!: ElementRef;
  showBlurLayer = false;

  constructor(private renderer: Renderer2) {}

  public closeTab(event: MouseEvent): void {
    const closedTab = event.target as HTMLElement;
    this.tabClosed.emit(closedTab.parentElement?.children[0].id);
  }
  public toggleMove() {
    const tab = this.tab.nativeElement as HTMLElement;
    tab.classList.toggle('draggable');
    this.showBlurLayer = !this.showBlurLayer;
  }
}
