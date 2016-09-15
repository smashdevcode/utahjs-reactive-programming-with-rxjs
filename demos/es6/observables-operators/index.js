

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

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.interval(1000);

// obs.subscribe(observer);

// Example 2: Using `create`

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

// TODO Point out that the Observable never stops producing values


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
// `fromEvent` Operator
////////////////////////////////////////////////////////////////////////////////////////

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.fromEvent(document, 'mousemove');

// const sub = obs.subscribe(observer);


////////////////////////////////////////////////////////////////////////////////////////
// Combining Observables
////////////////////////////////////////////////////////////////////////////////////////

// Example 1: Using the `concat` operator

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


//  _________  ___  ___  _______           _______   ________   ________     
// |\___   ___\\  \|\  \|\  ___ \         |\  ___ \ |\   ___  \|\   ___ \    
// \|___ \  \_\ \  \\\  \ \   __/|        \ \   __/|\ \  \\ \  \ \  \_|\ \   
//      \ \  \ \ \   __  \ \  \_|/__       \ \  \_|/_\ \  \\ \  \ \  \ \\ \  
//       \ \  \ \ \  \ \  \ \  \_|\ \       \ \  \_|\ \ \  \\ \  \ \  \_\\ \ 
//        \ \__\ \ \__\ \__\ \_______\       \ \_______\ \__\\ \__\ \_______\
//         \|__|  \|__|\|__|\|_______|        \|_______|\|__| \|__|\|_______|
//                                                                          

