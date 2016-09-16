
// VanillaJS Version #1

// // This version utilizes a function that does more than one action.

// const a = document.querySelector('#a');
// const b = document.querySelector('#b');
// const c = document.querySelector('#c');

// function handleBlurEvent() {
//   const aValue = parseFloat(a.value);
//   const bValue = parseFloat(b.value);

//   let cValue = '';
//   if (!(isNaN(aValue) || isNaN(bValue))) {
//     cValue = aValue + bValue;
//   }

//   c.value = cValue;
// }

// a.addEventListener('blur', handleBlurEvent);
// b.addEventListener('blur', handleBlurEvent);

// VanillaJS Version #2

// const a = document.querySelector('#a');
// const b = document.querySelector('#b');
// const c = document.querySelector('#c');

// let aValue;
// let bValue;

// function calculate() {
//   c.value = (!(isNaN(aValue) || isNaN(bValue))) ? (aValue + bValue) : '';
// }

// a.addEventListener('blur', evt => {
//   aValue = parseFloat(evt.srcElement.value);
//   calculate();
// });
// b.addEventListener('blur', evt => {
//   bValue = parseFloat(evt.srcElement.value);  
//   calculate();
// });

// RxJS Version #1

// const a = document.querySelector('#a');
// const b = document.querySelector('#b');
// const c = document.querySelector('#c');

// const operators = obs => obs
//   .map(v => parseFloat(v.srcElement.value));

// const aValues = Rx.Observable.fromEvent(a, 'blur').let(operators);
// const bValues = Rx.Observable.fromEvent(b, 'blur').let(operators);

// const obs = Rx.Observable.combineLatest(aValues, bValues, 
//   (a, b) => (!(isNaN(a) || isNaN(b))) ? (a + b) : '');

// obs.subscribe(v => c.value = v);

// RxJS Version #2

// const a = document.querySelector('#a');
// const b = document.querySelector('#b');
// const c = document.querySelector('#c');

// const operators = obs => obs
//   .map(v => parseFloat(v.srcElement.value))
//   .debounceTime(500);

// const aValues = Rx.Observable.fromEvent(a, 'keyup').let(operators);
// const bValues = Rx.Observable.fromEvent(b, 'keyup').let(operators);

// const obs = Rx.Observable.combineLatest(aValues, bValues, 
//   (a, b) => (!(isNaN(a) || isNaN(b))) ? (a + b) : '');

// obs.subscribe(v => c.value = v);
