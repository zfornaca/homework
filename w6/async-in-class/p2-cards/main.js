// callbacks

//1 single card from new deck
// $.getJSON('https://deckofcardsapi.com/api/deck/new/draw/', function(data) {
//   let value = data.cards[0].value.toLowerCase();
//   let suit = data.cards[0].suit.toLowerCase();
//   console.log(`${value} of ${suit}`);
// });

//2 consecutive cards from same deck
// $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/', function(data) {
//   let deck_id = data.deck_id;
//   $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`, function(
//     data
//   ) {
//     let value1 = data.cards[0].value.toLowerCase();
//     let suit1 = data.cards[0].suit.toLowerCase();
//     $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`, function(
//       data
//     ) {
//       let value2 = data.cards[0].value.toLowerCase();
//       let suit2 = data.cards[0].suit.toLowerCase();
//       console.log(`${value1} of ${suit1}`);
//       console.log(`${value2} of ${suit2}`);
//     });
//   });
// });

//3 an entire stupid deck
// $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/', function(data) {
//   let deck_id = data.deck_id;
//   $('button').on('click', function(data) {
//     $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`, function(
//       data
//     ) {
//       let cardPic = data.cards[0].image;
//       $('#cardfield').append(`<img class='card' src='${cardPic}'>`);
//       if (data.remaining === 0) {
//         $('#cardfield').empty();
//         $('#cardfield').append(
//           `<img src='http://doondoondoon.com/wp-content/uploads/2016/04/solitairecascade-735x420.png'>`
//         );
//       }
//     });
//   });
// });

// promises

//1 single card from the deck
// $.getJSON('https://deckofcardsapi.com/api/deck/new/draw/').then(data => {
//   let value = data.cards[0].value.toLowerCase();
//   let suit = data.cards[0].suit.toLowerCase();
//   console.log(`${value} of ${suit}`);
// });

//2 consecutive cards from same deck
// $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/').then(data => {
//   let deck_id = data.deck_id;
//   $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`).then(
//     data => {
//       let value1 = data.cards[0].value.toLowerCase();
//       let suit1 = data.cards[0].suit.toLowerCase();
//       $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`).then(
//         data => {
//           let value2 = data.cards[0].value.toLowerCase();
//           let suit2 = data.cards[0].suit.toLowerCase();
//           console.log(`${value1} of ${suit1}`);
//           console.log(`${value2} of ${suit2}`);
//         }
//       );
//     }
//   );
// });

//3 an entire deck
// $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/').then(data => {
//   let deck_id = data.deck_id;
//   $('button').on('click', function(data) {
//     $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`).then(
//       data => {
//         let cardPic = data.cards[0].image;
//         $('#cardfield').append(`<img class='card' src='${cardPic}'>`);
//         if (data.remaining === 0) {
//           $('#cardfield').empty();
//           $('#cardfield').append(
//             `<img src='http://doondoondoon.com/wp-content/uploads/2016/04/solitairecascade-735x420.png'>`
//           );
//         }
//       }
//     );
//   });
// });

// async/await

//1 single card from the deck
// async function f() {
//   let data = await $.getJSON('https://deckofcardsapi.com/api/deck/new/draw/');
//   let value = data.cards[0].value.toLowerCase();
//   let suit = data.cards[0].suit.toLowerCase();
//   console.log(`${value} of ${suit}`);
// }
// f();

//2 consecutive cards from same deck
// async function f() {
//   let shuffle = await $.getJSON(
//     'https://deckofcardsapi.com/api/deck/new/shuffle/'
//   );
//   let deck_id = shuffle.deck_id;
//   let draw1 = await $.getJSON(
//     `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`
//   );
//   let value1 = draw1.cards[0].value.toLowerCase();
//   let suit1 = draw1.cards[0].suit.toLowerCase();
//   let draw2 = await $.getJSON(
//     `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`
//   );
//   let value2 = draw2.cards[0].value.toLowerCase();
//   let suit2 = draw2.cards[0].suit.toLowerCase();
//   console.log(`${value1} of ${suit1}`);
//   console.log(`${value2} of ${suit2}`);
// }
// f();

//3 an entire deck
// async function f() {
//   let shuffle = await $.getJSON(
//     'https://deckofcardsapi.com/api/deck/new/shuffle/'
//   );
//   let deck_id = shuffle.deck_id;
//   $('button').on('click', async function(data) {
//     let draw = await $.getJSON(
//       `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`
//     );
//     let cardPic = draw.cards[0].image;
//     $('#cardfield').append(`<img class='card' src='${cardPic}'>`);
//     if (draw.remaining === 0) {
//       $('#cardfield').empty();
//       $('#cardfield').append(
//         `<img src='http://doondoondoon.com/wp-content/uploads/2016/04/solitairecascade-735x420.png'>`
//       );
//     }
//   });
// }
// f();
