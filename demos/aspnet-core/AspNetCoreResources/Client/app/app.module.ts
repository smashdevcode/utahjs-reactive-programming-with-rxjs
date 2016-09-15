
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ResourceComponent, ResourceListComponent, ResourceService } from './resources';

import { routing } from './app.routing';

import './shared/rxjs-operators';

@NgModule({
  imports:      [ BrowserModule, HttpModule, ReactiveFormsModule, routing ],
  providers:    [ ResourceService ],
  declarations: [ AppComponent, ResourceComponent, ResourceListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
