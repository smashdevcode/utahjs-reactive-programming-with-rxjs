

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
// `interval` Operator
////////////////////////////////////////////////////////////////////////////////////////

// Example 1: `interval` operator

// const obs = Rx.Observable.interval(1000);

// obs.subscribe(v => console.log(v));

// Example 2: Observer object

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.interval(1000);

// obs.subscribe(observer);

// TODO Show that we can add more than one subscriber
// TODO Point out that the Observable never stops producing values


////////////////////////////////////////////////////////////////////////////////////////
// Subscriptions and `unsubscribe`
////////////////////////////////////////////////////////////////////////////////////////

// const observer = {
//   next: v => console.log(v),
//   error: err => console.error(err),
//   complete: () => console.log('Done')
// };

// const obs = Rx.Observable.interval(1000);

// const sub = obs.subscribe(observer);

// setTimeout(() => {
//   sub.unsubscribe();
// }, 5000);


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

// const obs1 = Rx.Observable.interval(200);

// const obs2 = obs1
//   .map(v => v * 2)
//   .filter(v => v % 7 === 0);

// obs1.subscribe(v => console.log(`Obs1: ${v}`));
// obs2.subscribe(v => console.log(`Obs2: ${v}`));


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


//  _________  ___  ___  _______           _______   ________   ________     
// |\___   ___\\  \|\  \|\  ___ \         |\  ___ \ |\   ___  \|\   ___ \    
// \|___ \  \_\ \  \\\  \ \   __/|        \ \   __/|\ \  \\ \  \ \  \_|\ \   
//      \ \  \ \ \   __  \ \  \_|/__       \ \  \_|/_\ \  \\ \  \ \  \ \\ \  
//       \ \  \ \ \  \ \  \ \  \_|\ \       \ \  \_|\ \ \  \\ \  \ \  \_\\ \ 
//        \ \__\ \ \__\ \__\ \_______\       \ \_______\ \__\\ \__\ \_______\
//         \|__|  \|__|\|__|\|_______|        \|_______|\|__| \|__|\|_______|
//                                                                          

