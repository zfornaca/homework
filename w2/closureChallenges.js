/* 
1. Write a function that returns a function with closure
over a 'count' variable that increments each time
*/

function closureCounter() {
  let count = 0;
  return function innerCounter() {
    return ++count;
  };
}
// Tests for #1
// closureCounter()(); // 1
// closureCounter()(); // 1
// var firstCounter = closureCounter();
// firstCounter(); // 1
// firstCounter(); // 2
// var secondCounter = closureCounter();
// secondCounter(); // 1
// firstCounter(); // 3

/* 
2. Write a function to act as a module (or API) using closure.
  It should have a private variable called "items" which is an empty array.
  It should return an object with four methods:
      addItem - insert an item at the end of the private array
      removeItemAt - given an index, remove an item from the private array at that index,
                   and returns the removed item
      getItemAt - given an index, return an item from the private array with at that index
      getAll - return a copy of the private array
*/

function itemModule() { }

// Tests for #2
var instance = itemModule();
instance.addItem('taco');
instance.getItemAt(0); // taco
instance.addItem('burrito');
instance.getAll(); // ['taco', 'burrito']
instance.removeItemAt(0); // 'taco'
instance.getAll(); // ['burrito']






////////////////////////

// 1. What does printFriend print? Why?
var friend = 'Chewie';

function printFriend() {
  console.log(friend);
  friend = 'R2D2';
}

// 2. What does printFriendAgain print? Why?
function printFriendAgain() {
  console.log(friend);
  var friend = 'R2D2';
}

// 3. What is printed below? Why?

console.log('I live near ' + address);
var address = '3338 17th St, San Francisco';

// 4. What is printed below? Why?

console.log('I live near ' + addressString());
function addressString() {
  return '3338 17th St, San Francisco'
}

// 5. What is printed below? Why?

console.log('My name is ' + myName());
var myName = function () {
  return 'Michael';
}


//////////////////////

/* 
1. Write a function that returns a function that prints "hello world"
*/
function higherOrderHelloWorld() { }

// Tests for #1
higherOrderHelloWorld()(); // hello world
var higherOrderHelloWorld = higherOrderHelloWorld();
higherOrderHelloWorld(); // hello world

// ----------------------------------------------

/* 
2. Write a function that takes a number,
that returns a function that takes another number,
that returns the sum of the two numbers
*/

function higherOrderSum() { }

// Tests for #2
higherOrderSum(5)(10); // 15
var add10 = higherOrderSum(10);
add10(5); // 15
add10(10); // 20

// ----------------------------------------------

/* 
3. Write a function that includes a greeting "Hello ",
    and returns a function that takes a 'name' parameter
     OR uses "Stranger" as a default
*/

function higherOrderGreet() { }

// Tests for #3
higherOrderGreet()(); // Hello Stranger
higherOrderGreet()('Whiskey'); // Hello Whiskey
var greet = higherOrderGreet();
greet('Adele'); // Hello Adele

// ----------------------------------------------

/* 
*** BONUS ***
4. Write a function that takes a callback to implement the
  forEach array method.
*/

function myForEach(arr, callback) { }

// test for #4
var myArr = ['one', 'two', 'three', 'four'];
myForEach(myArr, function (element, i) {
  console.log(element, i);
});
/*
one, 0
two, 1
three, 2
four, 3
*/

// ----------------------------------------------

/* 5. 
*** BONUS ***
Write a function that takes a callback to implement the
   forEach array method.
*/
function myMap(arr, callback) { }

// test for #5
var mySecondArr = [1, 2, 3, 4, 5];
console.log(
  myMap(mySecondArr, function (element, i) {
    return element * element;
  })
);
/**
 * (5) [1, 4, 9, 16, 25]
 */