import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private markdownContent = new Map<string, SafeHtml>();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  setMarkdownContent(key: string, content: string) {
    this.markdownContent.set(
      key,
      this.sanitizer.bypassSecurityTrustHtml(content)
    );
  }

  setMarkdownContentFromFile(key: string, url: string) {
    this.http.get(url, { responseType: 'text' }).subscribe((content) => {
      this.markdownContent.set(
        key,
        this.sanitizer.bypassSecurityTrustHtml(content)
      );
    });
  }

  getMarkdownContent(key: string): SafeHtml {
    return this.markdownContent.get(key)!;
  }

  getMarkdownContentFromFile(url: string): SafeHtml {
    let rawContent = '';
    this.http.get(url, { responseType: 'text' }).subscribe((content) => {
      rawContent = content;
    });
    return this.sanitizer.bypassSecurityTrustHtml(rawContent);
  }
}
