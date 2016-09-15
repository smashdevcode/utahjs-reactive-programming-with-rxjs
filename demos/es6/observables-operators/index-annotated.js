

//  ________  ________  ________  _______   ________  ___      ___ ________  ________  ___       _______   ________                       
// |\   __  \|\   __  \|\   ____\|\  ___ \ |\   __  \|\  \    /  /|\   __  \|\   __  \|\  \     |\  ___ \ |\   ____\                      
// \ \  \|\  \ \  \|\ /\ \  \___|\ \   __/|\ \  \|\  \ \  \  /  / | \  \|\  \ \  \|\ /\ \  \    \ \   __/|\ \  \___|_                     
//  \ \  \\\  \ \   __  \ \_____  \ \  \_|/_\ \   _  _\ \  \/  / / \ \   __  \ \   __  \ \  \    \ \  \_|/_\ \_____  \                    
//   \ \  \\\  \ \  \|\  \|____|\  \ \  \_|\ \ \  \\  \\ \    / /   \ \  \ \  \ \  \|\  \ \  \____\ \  \_|\ \|____|\  \                   
//    \ \_______\ \_______\____\_\  \ \_______\ \__\\ _\\ \__/ /     \ \__\ \__\ \_______\ \_______\ \_______\____\_\  \                  
//     \|_______|\|_______|\_________\|_______|\|__|\|__|\|__|/       \|__|\|__|\|_______|\|_______|\|_______|\_________\                 
//                        \|_________|                                                                       \|_________|                 
                                                                                                                                       
                                                                                                                                       
//  ________  ________   ________          ________  ________  _______   ________  ________  _________  ________  ________  ________      
// |\   __  \|\   ___  \|\   ___ \        |\   __  \|\   __  \|\  ___ \ |\   __  \|\   __  \|\___   ___\\   __  \|\   __  \|\   ____\     
// \ \  \|\  \ \  \\ \  \ \  \_|\ \       \ \  \|\  \ \  \|\  \ \   __/|\ \  \|\  \ \  \|\  \|___ \  \_\ \  \|\  \ \  \|\  \ \  \___|_    
//  \ \   __  \ \  \\ \  \ \  \ \\ \       \ \  \\\  \ \   ____\ \  \_|/_\ \   _  _\ \   __  \   \ \  \ \ \  \\\  \ \   _  _\ \_____  \   
//   \ \  \ \  \ \  \\ \  \ \  \_\\ \       \ \  \\\  \ \  \___|\ \  \_|\ \ \  \\  \\ \  \ \  \   \ \  \ \ \  \\\  \ \  \\  \\|____|\  \  
//    \ \__\ \__\ \__\\ \__\ \_______\       \ \_______\ \__\    \ \_______\ \__\\ _\\ \__\ \__\   \ \__\ \ \_______\ \__\\ _\ ____\_\  \ 
//     \|__|\|__|\|__| \|__|\|_______|        \|_______|\|__|     \|_______|\|__|\|__|\|__|\|__|    \|__|  \|_______|\|__|\|__|\_________\
//                                                                                                                           \|_________|


////////////////////////////////////////////////////////////////////////////////////////
// `of` Operator
////////////////////////////////////////////////////////////////////////////////////////

// In RxJS, the Observable object represents a push based collection. 
// Let's create a simple Observable object.

// const obs = Rx.Observable.of(1, 2, 3, 4, 5);

// obs.subscribe((v) => console.log(v));

// Things to note...

// 1) An Observable can have more than one observer or subscriber. 


////////////////////////////////////////////////////////////////////////////////////////
// Observer `next` Method
////////////////////////////////////////////////////////////////////////////////////////

// So how does the `of` operator work? Let's use the `create` operator to create our own version of the `of` operator.

// const obs = Rx.Observable.create(observer => {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   observer.next(4);
//   observer.next(5);
// });

// obs.subscribe((v) => console.log(v));


////////////////////////////////////////////////////////////////////////////////////////
// Observer `complete` and `error` Methods
////////////////////////////////////////////////////////////////////////////////////////

// In addition to the `next` method, the observer has two more methods we can use: `complete` and `error`.

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

// obs.subscribe(observer);

// Things to note...

// 1) We can pass our next, error, and complete functions directly into the `subscribe` method
// or we can pass an object that has functions with those names.

// 2) Notice that our subscriber doesn't receive any values after the `error` method is called. The same is true for the `complete` method. Calling either the `error` or `complete` method will cause the subscriber to unsubscribe from the Observable.

// 3) Keen "observers" will notice that Observables implement the Observer Design Pattern along with elements of the Iterator Design Pattern. The Observable object represents the object that sends notifications (the provider); the Observer object represents the class that receives them (the observer). Our Observable also produces a sequence of ordered values. But instead of its consumers requesting or pulling the "next" value, the Observable pushes values to its consumers (or subscribers) when they become available.


////////////////////////////////////////////////////////////////////////////////////////
// Cold Observables
////////////////////////////////////////////////////////////////////////////////////////

// While it's not yet clear from our example, our Observable is an inert object. Nothing occurs until the first observer subscribes. In RxJS, we refer to this Observable as being "cold".

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


//
// Art by Shanaka Dias
//            __
// .-.__      \ .-.  ___  __
// |_|  '--.-.-(   \/\;;\_\.-._______.-.
// (-)___     \ \ .-\ \;;\(   \       \ \
//  Y    '---._\_((Q)) \;;\\ .-\     __(_)
//  I           __'-' / .--.((Q))---'    \,
//  I     ___.-:    \|  |   \'-'_          \
//  A  .-'      \ .-.\   \   \ \ '--.__     '\
//  |  |____.----((Q))\   \__|--\_      \     '
//     ( )        '-'  \_  :  \-' '--.___\
//      Y                \  \  \       \(_)
//      I                 \  \  \         \,
//      I                  \  \  \          \
//      A                   \  \  \          '\
//      |              snd   \  \__|           '
//                            \_:.  \
//                              \ \  \
//                               \ \  \
//                                \_\_|


////////////////////////////////////////////////////////////////////////////////////////
// `interval` Operator
////////////////////////////////////////////////////////////////////////////////////////

// Example 1: `interval` operator

// So far, all of our Observables have been producing a synchronous sequence of values. Typically, Observables asynchronously produce values over time. We can do exactly that using the `interval` operator.

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.interval(1000);

// obs.subscribe(observer);

// Example 2: Using `create`

// Let's look at how we'd implement this Observable using the `create` operator.

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

// Things to note...

// 1) Notice that our Observable never calls the `complete` method. This means that our Observable will produce values until the observer unsubscribes.


////////////////////////////////////////////////////////////////////////////////////////
// Subscriptions and `unsubscribe`
////////////////////////////////////////////////////////////////////////////////////////

// How does an observer unsubscribe from an Observable? By calling the `unsubscribe` method on the Subscription object that is returned from the `subscribe` method. So far, all of our examples have been ignoring the Subscription object.

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

// Okay... that stopped the console logs, but did the timer that was created by our call to `setInterval` actually stop?


////////////////////////////////////////////////////////////////////////////////////////
// `fromEvent` Operator
////////////////////////////////////////////////////////////////////////////////////////

// We can also create Observables from events, such as DOM events.

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.fromEvent(document, 'mousemove');

// const sub = obs.subscribe(observer);

// Things to note...

// Internally, the `fromEvent` operator is using `addEventListener` and `removeEventListener` to add and remove the event listener from the provided source element.


////////////////////////////////////////////////////////////////////////////////////////
// Combining Observables
////////////////////////////////////////////////////////////////////////////////////////

// Example 1: Using the `concat` operator

// So far, we've only been looking at operators that create Observables. But there are also operators that we can use to combine Observables.

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs1 = Rx.Observable.of(1, 2, 3, 4, 5);
// const obs2 = Rx.Observable.of(6, 7, 8, 9, 10);

// const obs = Rx.Observable.concat(obs1, obs2);

// obs.subscribe(observer);

// Example 2: The importance of completion

// If we create the first Observable using the `interval` operator, notice that the second Observable is never concatenated.

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs1 = Rx.Observable.interval(1000);
// const obs2 = Rx.Observable.of(6, 7, 8, 9, 10);

// const obs = Rx.Observable.concat(obs1, obs2);

// obs.subscribe(observer);

// Example 3: Using the `merge` operator

// Why does this happen? This is due to the first Observable never completing, so the second Observable is never subscribed to. One option we can use to combine two non-completing Observables is the `merge` operator.

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs1 = Rx.Observable.interval(1000);
// const obs2 = Rx.Observable.interval(2000);

// const obs = Rx.Observable.merge(obs1, obs2);

// obs.subscribe(observer);

// Example 4: Different types of streams

// We can also combine two completely different streams. For instance, we can combine mouse clicks with the latest value from a stream of values.

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs1 = Rx.Observable.interval(1000);
// const obs2 = Rx.Observable.fromEvent(document, 'click');

// const obs = obs2.withLatestFrom(obs1);

// obs.subscribe(observer);


//
// Yoda by Blazej Kozlowski & Faux_Pseudo
//                     ____
//                  _.' :  `._
//              .-.'`.  ;   .'`.-.
//     __      / : ___\ ;  /___ ; \      __
//   ,'_ ""--.:__;".-.";: :".-.":__;.--"" _`,
//   :' `.t""--.. '<@.`;_  ',@>` ..--""j.' `;
//        `:-.._J '-.-'L__ `-- ' L_..-;'
//          "-.__ ;  .-"  "-.  : __.-"
//              L ' /.------.\ ' J
//               "-.   "--"   .-"
//              __.l"-:_JL_;-";.__
//           .-j/'.;  ;""""  / .'\"-.
//         .' /:`. "-.:     .-" .';  `.
//      .-"  / ;  "-. "-..-" .-"  :    "-.
//   .+"-.  : :      "-.__.-"      ;-._   \
//   ; \  `.; ;                    : : "+. ;
//   :  ;   ; ;                    : ;  : \:
//  : `."-; ;  ;                  :  ;   ,/;
//   ;    -: ;  :                ;  : .-"'  :
//   :\     \  : ;             : \.-"      :
//    ;`.    \  ; :            ;.'_..--  / ;
//    :  "-.  "-:  ;          :/."      .'  :
//      \       .-`.\        /t-""  ":-+.   :
//       `.  .-"    `l    __/ /`. :  ; ; \  ;
//         \   .-" .-"-.-"  .' .'j \  /   ;/
//          \ / .-"   /.     .'.' ;_:'    ;
//           :-""-.`./-.'     /    `.___.'
//                 \ `t  ._  /  bug :F_P:
//                  "-.t-._:'
//


////////////////////////////////////////////////////////////////////////////////////////
// Transformation and Filtering Operators
////////////////////////////////////////////////////////////////////////////////////////

// Example 1: `map` and `filter` operators

// RxJS also has operators for transforming or filtering streams.

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.interval(200)
//   .map(v => v * 2)
//   .filter(v => v % 7 === 0);

// obs.subscribe(observer);

// Example 2: Pure functions

// If we subscribe to the original Observable, we can see that the `map` and `filter` operators are "pure", meaning that they don't modify the source Observable.

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs1 = Rx.Observable.interval(200);

// const obs2 = obs1
//   .map(v => v * 2)
//   .filter(v => v % 7 === 0);

// obs1.subscribe(observer);
// obs2.subscribe(observer);

// Example 3: Custom operator

// Let's implement our own `map` operator.

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

// Operators are pure, in the sense that they return new Observables and don't directly modify the source Observables that they subscribe to. While that's true, you still have to be careful that you don't modify values that are being passed by reference.

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

// With a little extra effort, we can preserve the original object values by using the `Object.assign` method.

// const obs1 = obs.map(v => {
//   let newValue = Object.assign({}, v);
//   newValue.name += ' Changed';
//   return newValue;
// });


////////////////////////////////////////////////////////////////////////////////////////
// Error Handling
////////////////////////////////////////////////////////////////////////////////////////

// RxJS provides a `catch` operator that allows us to catch errors and return a new Observable. But more interestingly, is the `retry` operator, which allows us to catch an error and retry subscribing to the original Observable a specified number of times.

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

// An important, but confusing topic to address, is the idea of "shared" vs "not-shared" Observables.

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.fromEvent(document, 'click');

// obs.subscribe(observer);
// obs.subscribe(observer);

// Example 2: Another look

// It looks like subscribers are receiving the same MouseEvent objects, but let's try mapping the clicks to random number.

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

// Each subscriber is getting its own value. This is by design: each subscriber gets its own Observable "pipeline" of values. There are a number of ways to change this behavior so that an Observable will "multicast" its values. Probably the easiest method is to use the `share` operator, which produces an Observable that shares a single "pipeline" across all of its subscribers.

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


////////////////////////////////////////////////////////////////////////////////////////
// Observables and Promises
////////////////////////////////////////////////////////////////////////////////////////

// Example 1: `toPromise` operator

// RxJS Observables play nicely with Promises. You can easily convert an Observable to a Promise using the `toPromise` operator.

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

// For the Promise to resolve, the Observable must complete. Also, if the Observable produces more than one value, only the last value will be emitted by the Promise.

// You can also convert Promises to Observables.

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


//  _________  ___  ___  _______           _______   ________   ________     
// |\___   ___\\  \|\  \|\  ___ \         |\  ___ \ |\   ___  \|\   ___ \    
// \|___ \  \_\ \  \\\  \ \   __/|        \ \   __/|\ \  \\ \  \ \  \_|\ \   
//      \ \  \ \ \   __  \ \  \_|/__       \ \  \_|/_\ \  \\ \  \ \  \ \\ \  
//       \ \  \ \ \  \ \  \ \  \_|\ \       \ \  \_|\ \ \  \\ \  \ \  \_\\ \ 
//        \ \__\ \ \__\ \__\ \_______\       \ \_______\ \__\\ \__\ \_______\
//         \|__|  \|__|\|__|\|_______|        \|_______|\|__| \|__|\|_______|
//                                                                          

