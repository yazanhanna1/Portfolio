import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from './services/theme.service';
import { tabAnimation } from './tab/tab-animations';

import { MarkdownService } from './services/markdown.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'],
  animations: [tabAnimation],
})
export class AppComponent {
  @Output()
  opeNewTab = new EventEmitter<string>();

  currentInput = '';
  listOfTabs = new Map<string, boolean>([
    ['about', true],
    ['projects', false],
    ['contact', false],
    ['gamer', false],
  ]);

  imageSrcs = new Map<string, string>([
    ['light', './assets/images/theme_switch.svg'],
    ['dark', './assets/images/theme_switch_dark.svg'],
  ]);
  currentImageSrc: string | undefined;

  constructor(
    private modalService: NgbModal,
    private themeService: ThemeService,
    private markdownService: MarkdownService
  ) {
    const currentTheme =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    this.currentImageSrc = this.imageSrcs.get(currentTheme);
    themeService.setTheme(currentTheme);

    markdownService.setMarkdownContentFromFile(
      'about',
      '../../assets/about-me.md'
    );
    markdownService.setMarkdownContentFromFile(
      'projects',
      '../../assets/projects.md'
    );
    markdownService.setMarkdownContentFromFile(
      'contact',
      '../../assets/contact.md'
    );
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  public openTab(event: MouseEvent): void {
    const clickedTab = event.target as HTMLElement;
    this.listOfTabs.set(clickedTab.id, true);
  }

  public closeTab(tabId: any) {
    this.listOfTabs.set(tabId, false);
  }

  public getTabContent(tabName: string): SafeHtml {
    return this.markdownService.getMarkdownContent(tabName);
  }

  public switchTheme(): void {
    this.themeService.switchTheme();
    this.currentImageSrc = this.imageSrcs.get(
      this.themeService.getCurrentTheme()
    );
  }

  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent): void {
    const key = event.key;
    switch (true) {
      case key.toLowerCase() === 'g':
        this.currentInput = 'g';
        break;
      case key.toLowerCase() === 'a':
        if (this.currentInput === 'g')
          this.currentInput = this.currentInput.concat('a');
        else this.currentInput = '';
        break;
      case key.toLowerCase() === 'm':
        if (this.currentInput === 'ga')
          this.currentInput = this.currentInput.concat('m');
        else this.currentInput = '';
        break;
      case key.toLowerCase() === 'e':
        if (this.currentInput === 'gam')
          this.currentInput = this.currentInput.concat('e');
        else this.currentInput = '';
        break;
      case key.toLowerCase() === 'r':
        if (this.currentInput === 'game') this.openSecretTab('gamer');
        break;
      default:
        this.currentInput = '';
        break;
    }
    console.log([key, this.currentInput]);
  }

  private openSecretTab(tabId: string): void {
    this.listOfTabs.set(tabId, true);
  }
  title = 'portfolio';
}
