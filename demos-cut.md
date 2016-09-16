
## The Spreadsheet as a Reactive Program

[Show empty file in Visual Studio Code]

In a typical imperative program, if we assign `a = 2` and `b = 3` and then assign `c` to be the sum of `a` and `b`, `c` would be equal to `5`. And then we could change the value of either `a` or `b`, and `c` would continue to be equal to `5`.

```
let a = 2;
let b = 3;
let c = a + b;
```

### `of` Operator

In RxJS, the Observable object represents a push based collection. Let's create a simple Observable object.

```
const obs = Rx.Observable.of(1, 2, 3, 4, 5);

obs.subscribe((v) => console.log(v));
```

This is what "hello world" looks like using RxJS. Using the `of` operator, we're able to create an Observable to  produce the sequence of values "1", "2", "3", "4", and "5". We subscribe to this Observable using the `subscribe` method, passing in a function to process each value that the Observable produces. In this example, we're just logging each value to the console.

An Observable can have more than one observer or subscriber. To add another subscriber, we can just call the `subscribe` method a second time.

```
const obs = Rx.Observable.of(1, 2, 3, 4, 5);

obs.subscribe((v) => console.log(v));
obs.subscribe((v) => console.log(v));
```

Now each value is being logged to the console twice.

### Observer `next` Method

So how does the `of` operator work? Let's use the `create` operator to create our own version of the `of` operator.

```
const obs = Rx.Observable.create(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.next(5);
});

obs.subscribe((v) => console.log(v));
```

When creating an Observable using the `create` operator, we pass in a function that accepts the observer as its parameter. We can then send values to the observer by calling its `next` method.

### Observer `complete` and `error` Methods

In addition to the `next` method, the observer has two more methods we can use: `complete` and `error`.

The `error` method can be used to let a subscriber know that an error occurred and pass along the relevant error information while the `complete` method can be used to tell a subscriber that the Observable is done producing values.

Calling either the `error` or `complete` method will cause the subscriber to unsubscribe from the Observable.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.create(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  // observer.error(Error('An error has occurred'));
  observer.next(4);
  observer.next(5);
  observer.complete();
  observer.next(6);
});

obs.subscribe(observer);
```

When subscribing to an Observable, we can pass into the `subscribe` method up to three functions: the `next` handler, the `error` handler, and the `complete` handler. Or we can pass in an object that defines one or more of those methods.

Notice that our subscriber doesn't receive any values after the `error` method is called. The same is true for the `complete` method.

Completion is an important concept in RxJS, as it enables operators such as `concat`, `last`, and `takeLast`. These operators wouldn't be able to function if it wasn't possible to know when an Observable has completed.

If you've ever worked with the Observer pattern before, you'll recognize it in this example. The Observable object represents the object that sends notifications (the provider); the Observer object represents the class that receives them (the observer).

You might also recognize the Iterator pattern in this example as our Observable produces a sequence of ordered values. But instead of its consumers requesting or pulling the "next" value, the Observable pushes values to its consumers (or subscribers) when they become available.

### Cold Observables

While it's not yet clear from our example, our Observable is an inert object. Nothing occurs until the first observer subscribes. In RxJS, we refer to this Observable as being "cold".

Let's add a `console.log` right before we send our first value and wrap our call to the Observable's `subscribe` method in a `setTimeout` function call, so that we're waiting 5 seconds until we subscribe to the Observable.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.create(observer => {
  console.log('Sending values');
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.next(5);
  observer.complete();
});

setTimeout(() => {
  obs.subscribe(observer);
}, 5000);
```

### `interval` Operator

So far, all of our Observables have been producing a synchronous sequence of values. Typically, Observables asynchronously produce values over time. We can do exactly that using the `interval` operator.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.interval(1000);

obs.subscribe(observer);
```

The `interval` operator creates an Observable that produces an auto-incrementing value on the provided time interval, which in our case is 1000 milliseconds or one second.

Let's look at how we'd implement this Observable using the `create` operator.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.create(observer => {
  let value = 0;
  setInterval(() => {
    observer.next(value);
    value++;
  }, 1000);
});

obs.subscribe(observer);
```

Notice that our Observable never calls the `complete` method. This means that our Observable will produce values until the observer unsubscribes.

### Subscriptions and `unsubscribe`

How does an observer unsubscribe from an Observable? By calling the `unsubscribe` method on the Subscription object that is returned from the `subscribe` method. So far, all of our examples have been ignoring the Subscription object.

Let's update our latest `create` example to call `unsubscribe` after 5 seconds has elapsed.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.create(observer => {
  let value = 0;
  setInterval(() => {
    observer.next(value);
    value++;
  }, 1000);
});

const sub = obs.subscribe(observer);

setTimeout(() => {
  sub.unsubscribe();
}, 5000);
```

Okay... that stopped the console logs, but did the timer that was created by our call to `setInterval` actually stop? Let's add a console log inside of its implementation to double check.

```
const obs = Rx.Observable.create(observer => {
  let value = 0;
  setInterval(() => {
    console.log(value);
    observer.next(value);
    value++;
  }, 1000);
});
```

So it actually didn't stop! It turns out that this is our fault. We need to return a method from our call to the `create` operator that should be called when the observer unsubscribes.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.create(observer => {
  let value = 0;
  const interval = setInterval(() => {
    console.log(value);
    observer.next(value);
    value++;
  }, 1000);

  return () => clearInterval(interval);
});

const sub = obs.subscribe(observer);

setTimeout(() => {
  sub.unsubscribe();
}, 5000);
```

`setInterval` returns an ID that we can use to call the `clearInterval` method to cancel our timer. Now our timer stops when the subscriber unsubscribes from our Observable.

### `fromEvent` Operator

We can also create Observables from events, such as DOM events.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.fromEvent(document, 'mousemove');

const sub = obs.subscribe(observer);
```

Internally, the `fromEvent` operator is using `addEventListener` and `removeEventListener` to add and remove the event listener from the provided source element.

### Combining Observables

So far, we've only been looking at operators that create Observables. But there are also operators that we can use to combine Observables.

To start, let's use the `concat` operator to concatenate two Observables created using the `of` operator.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs1 = Rx.Observable.of(1, 2, 3, 4, 5);
const obs2 = Rx.Observable.of(6, 7, 8, 9, 10);

const obs = Rx.Observable.concat(obs1, obs2);

obs.subscribe(observer);
```

If we create the first Observable using the `interval` operator, notice that the second Observable is never concatenated.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs1 = Rx.Observable.interval(1000);
const obs2 = Rx.Observable.of(6, 7, 8, 9, 10);

const obs = Rx.Observable.concat(obs1, obs2);

obs.subscribe(observer);
```

This is due to the first Observable never completing, so the second Observable is never subscribed to. One option we can use to combine two non-completing Observables is the `merge` operator.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs1 = Rx.Observable.interval(1000);
const obs2 = Rx.Observable.interval(2000);

const obs = Rx.Observable.merge(obs1, obs2);

obs.subscribe(observer);
```

We can also combine two completely different streams. For instance, we can combine mouse clicks with the latest value from a stream of values.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs1 = Rx.Observable.interval(1000);
const obs2 = Rx.Observable.fromEvent(document, 'click');

const obs = obs2.withLatestFrom(obs1);

obs.subscribe(observer);
```

### Transformation and Filtering Operators

RxJS also has operators for transforming or filtering streams. For example, it provides the familiar `map` and `filter` operators.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.interval(200)
  .map(v => v * 2)
  .filter(v => v % 7 === 0);

obs.subscribe(observer);
```

First, we're transforming all of the values by multiplying each by a factor of "2". Then, we're filtering to just the values that are divisible by "7".

If we subscribe to the original Observable, we can see that the `map` and `filter` operators are "pure", meaning that they don't modify the source Observable.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs1 = Rx.Observable.interval(200);

const obs2 = obs1
  .map(v => v * 2)
  .filter(v => v % 7 === 0);

obs1.subscribe(observer);
obs2.subscribe(observer);
```

Let's implement our own `map` operator.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

function customMap(project) {
  return Rx.Observable.create(observer => {
    // "this" is the source Observable that the `customMap` 
    // operator is being called on.
    return this.subscribe(
      v => { 
        try {
          observer.next(project(v));
        } catch (err) {
          observer.error(err);
        }
      },
      (err) => observer.error(err),
      () => observer.complete()
    );
  });
}

Rx.Observable.prototype.customMap = customMap;

const obs = Rx.Observable.of(1, 2, 3, 4, 5)
  .customMap(v => v * 2);

obs.subscribe(observer);
```

### Pure Operators

Operators are pure, in the sense that they return new Observables and don't directly modify the source Observables that they subscribe to. While that's true, you still have to be careful that you don't modify values that are being passed by reference.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.of(
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
);

const obs1 = obs.map(v => {
  v.name += ' Changed';
  return v;
});

obs1.subscribe(observer);

setTimeout(() => {
  obs.subscribe(observer);
}, 5000);
```

Here we're creating an Observable of two object literals and then modifying the `name` property of both using a `map` operator. If we subscribe to the original Observable after the first subscription has completed, we can see that the original objects were modified.

With a little extra effort, we can preserve the original object values by using the `Object.assign` method.

```
const obs1 = obs.map(v => {
  let newValue = Object.assign({}, v);
  newValue.name += ' Changed';
  return newValue;
});
```

### Error Handling

RxJS provides a `catch` operator that allows us to catch errors and return a new Observable. But more interestingly, is the `retry` operator, which allows us to catch an error and retry subscribing to the original Observable a specified number of times.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.create(observer => {
  let value = 0;
  const interval = setInterval(() => {
    if (value < 5) {
      observer.next(value);
      value++;
    } else {
      observer.error(Error());
    }
  }, 500);

  return () => clearInterval(interval);
});

obs.retry(2).subscribe(observer);
```

### Shared vs Not-Shared

An important, but confusing topic to address, is the idea of "shared" vs "not-shared" Observables. Let's look at the behavior of two subscribers to a "click" Observable.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.fromEvent(document, 'click');

obs.subscribe(observer);
obs.subscribe(observer);
```

It looks like subscribers are receiving the same MouseEvent objects, but let's try mapping the clicks to random number.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.fromEvent(document, 'click')
  .map(v => Math.random());

obs.subscribe(observer);
obs.subscribe(observer);
```

Now it's much clearer that each subscriber is getting its own value. This is by design: each subscriber gets its own Observable "pipeline" of values. There are a number of ways to change this behavior so that an Observable will "multicast" its values. Probably the easiest method is to use the `share` operator, which produces an Observable that shares a single "pipeline" across all of its subscribers.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.fromEvent(document, 'click')
  .map(v => Math.random())
  .share();

obs.subscribe(observer);
obs.subscribe(observer);
```

_Technical details: The `share` operator returns a Subject object with `refCount`, which means that the Subject won't subscribe to the source Observable until the first observer has subscribed._

### Observables and Promises

RxJS Observables play nicely with Promises. You can easily convert an Observable to a Promise using the `toPromise` operator.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const obs = Rx.Observable.interval(100).take(5);

const promise = obs.toPromise();

obs.subscribe(v => console.log(`From Observable: ${v}`));
promise.then(v => console.log(`From Promise: ${v}`));
```

For the Promise to resolve, the Observable must complete. Also, if the Observable produces more than one value, only the last value will be emitted by the Promise.

You can also convert Promises to Observables.

```
const observer = {
  next: v => console.log(v),
  error: err => console.error(err),
  complete: () => console.log('Done')
};

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Hello from Promise!');
  }, 5000);
});

const obs = Rx.Observable.fromPromise(promise);

obs.subscribe(v => console.log(`From Observable: ${v}`));
```

The `from` operator also works with Promises.

## Unit Testing

TODO Write up a quick blurb about unit testing with TestScheduler

RxJs Testing in Real World Applications
[https://blog.hyphe.me/rxjs-testing-in-real-world-applications/](https://blog.hyphe.me/rxjs-testing-in-real-world-applications/)

List out the challenges
  How to inject the TestScheduler into your app code

## Simple Spreadsheet Web Page

[Open Spreadsheet Demo in Visual Studio Code]

So how could we recreate our spreadsheet example in the browser? First, let's look at vanilla JavaScript example.

```
const a = document.querySelector('#a');
const b = document.querySelector('#b');
const c = document.querySelector('#c');

function handleBlurEvent() {
  const aValue = Number.parseFloat(a.value);
  const bValue = Number.parseFloat(b.value);

  let cValue = '';
  if (!(isNaN(aValue) || isNaN(bValue))) {
    cValue = aValue + bValue;
  }

  c.value = cValue;
}

a.addEventListener('blur', handleBlurEvent);
b.addEventListener('blur', handleBlurEvent);
```

Now let's look at a version that uses RxJS.

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

Both of these versions are "reactive" in the sense that the value for input element "c" is updated whenever input element's "a" or "c" lose focus.

What are the advantages of the RxJS version? If you're new to RxJS and reactive programming in general, then you'll probably gravitate towards the VanillaJS version. But if we changed our requirements slightly, updating "c" on keyup for instance, then the RxJS version will give us some powerful tools, such as the `debounceTime` operator, to make sure that the UI works well.

```
const a = document.querySelector('#a');
const b = document.querySelector('#b');
const c = document.querySelector('#c');

const operators = obs => obs
  .map(v => Number.parseFloat(v.srcElement.value))
  .debounceTime(500);

const aValues = Rx.Observable.fromEvent(a, 'keyup').let(operators);
const bValues = Rx.Observable.fromEvent(b, 'keyup').let(operators);

const obs = Rx.Observable.combineLatest(aValues, bValues, 
  (a, b) => (!(isNaN(a) || isNaN(b))) ? (a + b) : '');

obs.subscribe(v => c.value = v);
```

## Simple Spreadsheet Using Angular 2

We're currently referencing the DOM in our JavaScript. This creates a dependency and makes our code more difficult to test. We need a way to have a cleaner separation of concerns. Ideally our code wouldn't have any knowledge of our template. Let's see how Angular 2 can help.

TODO Create an Angular 2 version of our simple spreadsheet
