
# Demos

## The Spreadsheet as a Reactive Program

[Show empty file in Visual Studio Code]

In a typical imperative program, if we assign `a = 2` and `b = 3` and then assign `c` to be the sum of `a` and `b`, `c` would be equal to `5`. And then we could change the value of either `a` or `b`, and `c` would continue to be equal to `5`.

```
let a = 2;
let b = 3;
let c = a + b;
```

Let's look at an example that I'm sure all of you are familiar with: the spreadsheet.

[Show Excel]

But a typical spreadsheet program behaves differently. If we set column `a` to `2`, column `b` to `3`, and column `c` to the sum of `a` and `b`, changing the value of either column `a` or `b` will cause the value of `c` to update. Column `c` is an expression of the current state; if the state is changed, then the new state is propagated or pushed to column `c` so that it can update its contents. You could say that column `c` is listening for updates to columns `a` and `b`. That it's an observer who has subscribed to changes from the observable columns `a` and `b`.

So, this spreadsheet is a really, really basic example of Reactive Programming. Columns `a` and `b` would represent "Observables" and column `c` would represent an "Observer" or "Subscriber".

## Observables and Operators

[Open Observables and Operators demo in Visual Studio Code]

## Simple Spreadsheet Web Page

[Open Spreadsheet Demo in Visual Studio Code]

So how could we recreate our spreadsheet example in the browser using RxJS?

```
const a = document.querySelector('#a');
const b = document.querySelector('#b');
const c = document.querySelector('#c');

const operators = obs => obs
  .map(v => Number.parseFloat(v.srcElement.value));

const aValues = Rx.Observable.fromEvent(a, 'blur').let(operators);
const bValues = Rx.Observable.fromEvent(b, 'blur').let(operators);

const obs = Rx.Observable.combineLatest(aValues, bValues, 
  (a, b) => (!(isNaN(a) || isNaN(b))) ? (a + b) : '');

obs.subscribe(v => c.value = v);
```

## Angular 2

[Open the ASP.NET Core Resources demo in Visual Studio Code]

Now let's take a look at RxJS in the context of an Angular 2 app. Our Angular 2 app is using an ASP.NET Core backend and webpack for the front end build. This app allows users to search, add, and vote for ASP.NET Core online resources.

### Search Performance

The team that's working on this app reported a potential performance problem with the "Resources" view. Let's take a look.

[Test the search feature and point out how many API calls are being made]

Let's use Angular 2's reactive forms and RxJS to solve this problem.

Update the input element in the template to bind the form to the `formControl` property.

```
Search: <input type="text" [formControl]="term" />
```

Add a new component property for the FormControl object.

```
term = new FormControl();
```

Subscribe to the FormControl's `valueChanges` Observable property.

```
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
```





TODO Show how `switchMap` can help
  Add delay to the service method
  Switch to switchMap





## Wrap Up

[Switch to slides]