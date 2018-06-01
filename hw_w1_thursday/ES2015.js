// ES6 Template Literals
console.log(`${name} lives in ${city} and his favorite color is ${favoriteColor}.`);

// ES6 Global Constants
const PI = 3.14;

// ES6 Object Destructuring
var { a, b } = obj.numbers;

// ES6 One-Line Array Swap with Destructuring
[arr[0], arr[1]] = [arr[1], arr[0]];

// ES6 Map Callback Shorthand
arr.map(val => val * 2);


// ES6 Default Arguments
function add(a = 10, b = 10) {
  return a + b;
}

// ES5 Function that takes a variable number of arguments
// function sumMany() {
//   var nums = Array.prototype.slice.call(arguments);
//   return nums.reduce(function(a, b) {
//     return a + b;
//   }, 0);
// }

// ES6 Function that takes a variable number of arguments

function sumMany(...rest) {
  return rest.reduce(a, b) => a + b, 0);
}