import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer, private iab: InAppBrowser,) {
  }

  transform(value: any, args?: any): any {
      return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value));
  }

  openUrl(url) {
      this.iab.create(url, '_system', 'location=yes,hardwareback=yes');
  }

  private stylize(text: string): string {
      const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi;
      const splittedStr = text.split(/\s+/);
      let newString = '';
      splittedStr.map(s => {
          if (s.search(regex) > -1) {
              newString = newString + ' ' + `<a href="${s}" target="_blank">${s}</a> `
          } else {
              newString = newString + ' ' + s;
          }
      });
      // if (text && text.length > 0) {
      //   // for (let t of text.split("")) {
      //     if (text.search(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i) > -1){
      //       stylizedText += `<a href="${text}" target="_blank">${text}</a> `;
      //     }

      //     else {
      //       stylizedText += text + " ";
      //   }
      // }

      return newString;
  }

}
