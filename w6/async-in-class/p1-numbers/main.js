// callbacks

// 1 just once
// $.getJSON(`http://numbersapi.com/11?json`, function(data) {
//   $('body').append(`<p>${data.text}</p>`);
// });

// 2 multiple numbers at once
// $.getJSON(`http://numbersapi.com/1,2?json`, function(data) {
//   for (let key in data) {
//     $('body').append(`<p>${data[key].text}`);
//   }
// });

// 3 multiple results for same number
// for (let i = 0; i < 4; i++) {
//   $.getJSON(`http://numbersapi.com/11?json`, function(data) {
//     $('body').append(`<p>${data.text}</p>`);
//   });
// }

// promises

// 1 just once
// $.getJSON(`http://numbersapi.com/11?json`).then(data =>
//   $('body').append(`<p>${data.text}</p>`)
// );

// 2 multiple numbers at once
// $.getJSON(`http://numbersapi.com/1,2?json`).then(data => {
//   for (let key in data) $('body').append(`<p>${data[key].text}`);
// });

// 3 multiple results for same number
// for (let i = 0; i < 4; i++) {
//   $.getJSON(`http://numbersapi.com/11?json`).then(data => {
//     $('body').append(`<p>${data.text}</p>`);
//   });
// }

// async/await

// 1 just once
// async function f() {
//   let data = await $.getJSON(`http://numbersapi.com/11?json`);
//   $('body').append(`<p>${data.text}</p>`);
// }
// f();

// 2 multiple numbers at once
// async function f() {
//   let data = await $.getJSON(`http://numbersapi.com/1,2?json`);
//   for (let key in data) {
//     $('body').append(`<p>${data[key].text}`);
//   }
// }
// f();

// 3 multiple results for same number
// async function f() {
//   for (let i = 0; i < 4; i++) {
//     let data = await $.getJSON(`http://numbersapi.com/11?json`);
//     $('body').append(`<p>${data.text}</p>`);
//   }
// }
// f();
