import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompleteAutoServiceService implements AutoCompleteService{

  labelAttribute?: string;
  formValueAttribute?: any;

  constructor(private http:HttpClient) { }

  getResults(keyword:string) {
    if (!keyword) { return false; }

    return this.http.get('https://restcountries.eu/rest/v2/name/' + keyword).pipe(
      map(
       (result: any[]) => {
          return result.filter(
             (item) => {
                return item.name.toLowerCase().startsWith(
                   keyword.toLowerCase()
                );
             }
          );
       }
    ));
}
  getItemLabel?(item: any) {
    throw new Error("Method not implemented.");
  }
}
