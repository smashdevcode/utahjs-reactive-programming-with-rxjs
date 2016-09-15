
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Resource } from './resource';

import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ResourceService {
  constructor (private http: Http) { }

  private resourcesUrl = 'api/resources';

  getResources(): Observable<Resource[]> {
    return this.http.get(this.resourcesUrl)
      .do(v => console.log('getResources() called'))
      .map(this.extractData)
      .catch(this.handleError)
      .share();
  }

  getResourcesSearch(criteria: string): Observable<Resource[]> {
    return this.http.get(`${this.resourcesUrl}/search/${criteria}`)
      .do(v => console.log('getResourcesSearch() called'))
      .map(this.extractData)
      .catch(this.handleError)
      .share();
  }

  addResource(resource: Resource): Observable<Resource> {
    const body = JSON.stringify(resource);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(body);

    return this.http.post(this.resourcesUrl, body, options)
      .map(res => this.extractData(res)[0])
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
