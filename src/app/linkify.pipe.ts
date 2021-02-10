import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer,private iab: InAppBrowser,) {}

  transform(value: any, args?: any): any {
    return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value));
  }

  openUrl(url){
 this.iab.create(url,'_system', 'location=yes,hardwareback=yes');
  }

  private stylize(text: string): string {
    let stylizedText: string = "";
    if (text && text.length > 0) {
      for (let t of text.split(" ")) {
        if (t.startsWith("https") && t.length > 1)
          stylizedText += `<a href="${t}" target="_system">${t}</a> `;
        else stylizedText += t + " ";
      }
      return stylizedText;
    } else return text;
  }

}
