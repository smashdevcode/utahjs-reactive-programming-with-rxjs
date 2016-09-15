
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Resource, ResourceService } from '../shared';

@Component({
  selector: 'resource-list',
  templateUrl: require('./resource-list.component.html')
})
export class ResourceListComponent implements OnInit {
  errorMessage: string; // Not currently displayed in the template
  resources: Observable<Resource[]>;

  constructor(private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.getResources();
  }

  search(term: string) {
    if (term) {
      this.resources = this.resourceService.getResourcesSearch(term)
        .catch(this.handleError);
    } else {
      this.getResources();
    }
  }

  getResources() {
    this.resources = this.resourceService.getResources()
      .catch(this.handleError);
  }

  handleError(error: any) {
    let errorMessage = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Unexpected error';
    this.errorMessage = errorMessage;
    return Observable.empty();
  }
}
