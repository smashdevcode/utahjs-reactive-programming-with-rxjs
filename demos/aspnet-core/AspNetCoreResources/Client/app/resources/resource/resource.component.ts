
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Resource, ResourceService } from '../shared';

@Component({
  selector: 'resource',
  templateUrl: require('./resource.component.html')
})
export class ResourceComponent implements OnInit {
  errorMessage: string; // Not currently displayed in the template
  resourceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private resourceService: ResourceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      url: ['', Validators.required],
      contributors: this.formBuilder.array([
        this.initContributor()
      ])
    });
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
        this.resourceForm.reset();
        this.router.navigate(['/resources']);
      },
      error => this.errorMessage = <any>error      
    );
  }

  cancel() {
    this.router.navigate(['/resources']);
  }
}
