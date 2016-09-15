
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

