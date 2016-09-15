
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Resource, ResourceService } from './resources';

@Component({
  selector: 'my-app',
  templateUrl: require('./app.component.html')
})
export class AppComponent implements OnInit {
  errorMessage: string; // Not currently displayed in the template
  resources: Observable<Resource[]>;
  term = new FormControl();
  resourceForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .do(value => console.log(`Performing search: ${value}`))
      .subscribe(
        term => {
          if (term) {
            this.resources = this.resourceService.getResourcesSearch(term)
              .catch(this.handleError);
          } else {
            this.getResources();
          }
        }
      );

    this.resourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      url: ['', Validators.required],
      contributors: this.formBuilder.array([
        this.initContributor()
      ])
    });

    this.getResources();
  }

  initContributor() {
    return this.formBuilder.group({
      contributorId: [null, Validators.required],
      roleId: [null, Validators.required]
    });
  }

  addContributor() {
    const control = <FormArray>this.resourceForm.controls['contributors'];
    control.push(this.initContributor());
  }

  removeContributor(contributorIndex: number) {
    const control = <FormArray>this.resourceForm.controls['contributors'];
    control.removeAt(contributorIndex);
  }

  addResource() {
    const resource = this.resourceForm.value;
    this.resourceService.addResource(resource).subscribe(resource => {
        this.getResources();
        this.resourceForm.reset();
      },
      error => this.errorMessage = <any>error      
    );
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
