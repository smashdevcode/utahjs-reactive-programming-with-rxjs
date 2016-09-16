
////////////////////////////////////////////////////////////////////////////////////////
// `of` Operator
////////////////////////////////////////////////////////////////////////////////////////

// const obs = Rx.Observable.of(1, 2, 3, 4, 5);

// obs.subscribe((v) => console.log(v));


////////////////////////////////////////////////////////////////////////////////////////
// Observer `next` Method
////////////////////////////////////////////////////////////////////////////////////////

// const obs = Rx.Observable.create(observer => {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   observer.next(4);
//   observer.next(5);
// });

// obs.subscribe((v) => console.log(v));

// TODO Show that we can add more than one subscriber


////////////////////////////////////////////////////////////////////////////////////////
// Observer `complete` and `error` Methods
////////////////////////////////////////////////////////////////////////////////////////

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.create(observer => {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   // observer.error(Error('An error has occurred'));
//   observer.next(4);
//   observer.next(5);
//   observer.complete();
//   observer.next(6);
// });

// obs.subscribe(
//   v => console.log(v),
//   err => console.error(err),
//   () => console.log('Done')  
// );

// obs.subscribe(observer);

// TODO Show the two different ways that we can pass the next, error, and complete functions
// TODO Show what happens when an error is thrown


////////////////////////////////////////////////////////////////////////////////////////
// Cold Observables
////////////////////////////////////////////////////////////////////////////////////////

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.create(observer => {
//   console.log('Sending values');
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   observer.next(4);
//   observer.next(5);
//   observer.complete();
// });

// setTimeout(() => {
//   obs.subscribe(observer);
// }, 5000);


////////////////////////////////////////////////////////////////////////////////////////
// `interval` Operator
////////////////////////////////////////////////////////////////////////////////////////

// Example 3: Using `create`

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.create(observer => {
//   let value = 0;
//   setInterval(() => {
//     observer.next(value);
//     value++;
//   }, 1000);
// });

// obs.subscribe(observer);


////////////////////////////////////////////////////////////////////////////////////////
// Subscriptions and `unsubscribe`
////////////////////////////////////////////////////////////////////////////////////////

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.create(observer => {
//   let value = 0;
//   setInterval(() => {
//     observer.next(value);
//     value++;
//   }, 1000);
// });

// const sub = obs.subscribe(observer);

// setTimeout(() => {
//   sub.unsubscribe();
// }, 5000);

// TODO Make sure that the timer actually stops


////////////////////////////////////////////////////////////////////////////////////////
// Transformation and Filtering Operators
////////////////////////////////////////////////////////////////////////////////////////

// Example 3: Custom operator

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// function customMap(project) {
//   return Rx.Observable.create(observer => {
//     // "this" is the source Observable that the `customMap` 
//     // operator is being called on.
//     return this.subscribe(
//       v => { 
//         try {
//           observer.next(project(v));
//         } catch (err) {
//           observer.error(err);
//         }
//       },
//       (err) => observer.error(err),
//       () => observer.complete()
//     );
//   });
// }

// Rx.Observable.prototype.customMap = customMap;

// const obs = Rx.Observable.of(1, 2, 3, 4, 5)
//   .customMap(v => v * 2);

// obs.subscribe(observer);


////////////////////////////////////////////////////////////////////////////////////////
// Pure Operators
////////////////////////////////////////////////////////////////////////////////////////

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.of(
//   { id: 1, name: 'Item One' },
//   { id: 2, name: 'Item Two' }
// );

// const obs1 = obs.map(v => {
//   v.name += ' Changed';
//   return v;
// });

// obs1.subscribe(observer);

// setTimeout(() => {
//   obs.subscribe(observer);
// }, 5000);


////////////////////////////////////////////////////////////////////////////////////////
// Error Handling
////////////////////////////////////////////////////////////////////////////////////////

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.create(observer => {
//   let value = 0;
//   const interval = setInterval(() => {
//     if (value < 5) {
//       observer.next(value);
//       value++;
//     } else {
//       observer.error(Error());
//     }
//   }, 500);

//   return () => clearInterval(interval);
// });

// obs.retry(2).subscribe(observer);


////////////////////////////////////////////////////////////////////////////////////////
// Shared vs Not-Shared
////////////////////////////////////////////////////////////////////////////////////////

// Example 1: Shared data streams?

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.fromEvent(document, 'click');

// obs.subscribe(observer);
// obs.subscribe(observer);

// Example 2: Another look

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.fromEvent(document, 'click')
//   .map(v => Math.random());

// obs.subscribe(observer);
// obs.subscribe(observer);

// Example 3: The fix

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.fromEvent(document, 'click')
//   .map(v => Math.random())
//   .share();

// obs.subscribe(observer);
// obs.subscribe(observer);


////////////////////////////////////////////////////////////////////////////////////////
// Observables and Promises
////////////////////////////////////////////////////////////////////////////////////////

// Example 1: `toPromise` operator

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.interval(100).take(5);

// const promise = obs.toPromise();

// obs.subscribe(v => console.log(`From Observable: ${v}`));
// promise.then(v => console.log(`From Promise: ${v}`));

// Example 2: `fromPromise` operator

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const promise = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve('Hello from Promise!');
//   }, 5000);
// });

// const obs = Rx.Observable.fromPromise(promise);

// obs.subscribe(v => console.log(`From Observable: ${v}`));



//
//               _______
//          ..-'`       ````---.
//        .'          ___ .'````.'SS'.
//       /        ..-SS####'.  /SSHH##'.
//      |       .'SSSHHHH##|/#/#HH#H####'.
//     /      .'SSHHHHH####/||#/: \SHH#####\
//    /      /SSHHHHH#####/!||;`___|SSHH###\
// -..__    /SSSHHH######.         \SSSHH###\
// `.'-.''--._SHHH#####.'           '.SH####/
//   '. ``'-  '/SH####`/_             `|H##/
//   | '.     /SSHH###|`'==.       .=='/\H|
//   |   `'-.|SHHHH##/\__\/        /\//|~|/
//   |    |S#|/HHH##/             |``  |
//   |    \H' |H#.'`              \    |
//   |        ''`|               -     /
//   |          /H\          .----    /
//   |         |H#/'.           `    /
//   |          \| | '..            /
//   |    ^~DLF   /|    ''..______.'
//    \          //\__    _..-. | 
//     \         ||   ````     \ |_
//      \    _.-|               \| |_
//      _\_.-'   `'''''-.        |   `--.
//  ''``    \            `''-;    \ /
//           \      .-'|     ````.' -
//           |    .'  `--'''''-.. |/
//           |  .'               \|
//           |.'
//

