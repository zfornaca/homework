// callbacks

//1 all the pokemon (...that matter)
// $.getJSON('https://pokeapi.co/api/v2/pokemon/?limit=151', function(data) {
//   console.log(data);
// });

//2 pick 3 pokemons
// $.getJSON('https://pokeapi.co/api/v2/pokemon/?limit=151', function(data) {
//   for (let i = 0; i < 3; i++) {
//     let pokeID = Math.floor(Math.random() * 151);
//     console.log(data.results[pokeID].name);
//     console.log(data.results[pokeID].url);
//   }
// });

//3 display cards for 3 pokemons
// $('button').on('click', function() {
//   $('#poke-holder').empty();
//   for (let i = 0; i < 3; i++) {
//     let pokeID = Math.floor(Math.random() * 151);
//     $.getJSON(`https://pokeapi.co/api/v2/pokemon/${pokeID}/`, function(data) {
//       let name = data.name.toUpperCase();
//       let img = data.sprites.front_default;
//       $.getJSON(`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`, function(
//         data
//       ) {
//         let bio = data.flavor_text_entries.find(function(entry) {
//           return entry.version.name === 'ruby';
//         }).flavor_text;
//         $('#poke-holder').append(
//           `<div class="pokeman"><h2>${name}</h2><img src='${img}'><p>${bio}</p>`
//         );
//       });
//     });
//   }
// });

// promises

//1 all the pokemon (...that matter)
// $.getJSON('https://pokeapi.co/api/v2/pokemon/?limit=151').then(data => {
//   console.log(data);
// });

//2 pick 3 pokemons
// $.getJSON('https://pokeapi.co/api/v2/pokemon/?limit=151').then(data => {
//   for (let i = 0; i < 3; i++) {
//     let pokeID = Math.floor(Math.random() * 151);
//     console.log(data.results[pokeID].name);
//     console.log(data.results[pokeID].url);
//   }
// });

//3 display cards for 3 pokemons
// $('button').on('click', function() {
//   $('#poke-holder').empty();
//   for (let i = 0; i < 3; i++) {
//     let pokeID = Math.floor(Math.random() * 151);
//     $.getJSON(`https://pokeapi.co/api/v2/pokemon/${pokeID}/`).then(data => {
//       let name = data.name.toUpperCase();
//       let img = data.sprites.front_default;
//       $.getJSON(`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`).then(
//         data => {
//           let bio = data.flavor_text_entries.find(function(entry) {
//             return entry.version.name === 'ruby';
//           }).flavor_text;
//           $('#poke-holder').append(
//             `<div class="pokeman"><h2>${name}</h2><img src='${img}'><p>${bio}</p>`
//           );
//         }
//       );
//     });
//   }
// });

// async/await

//1 all the pokemon (...that matter)
// async function f() {
//   let data = await $.getJSON('https://pokeapi.co/api/v2/pokemon/?limit=151');
//   console.log(data);
// }
// f();

//2 pick 3 pokemons
// async function f() {
//   let data = await $.getJSON('https://pokeapi.co/api/v2/pokemon/?limit=151');
//   for (let i = 0; i < 3; i++) {
//     let pokeID = Math.floor(Math.random() * 151);
//     console.log(data.results[pokeID].name);
//     console.log(data.results[pokeID].url);
//   }
// }
// f();

//3 display cards for 3 pokemons
// $('button').on('click', async function() {
//   $('#poke-holder').empty();
//   for (let i = 0; i < 3; i++) {
//     let pokeID = Math.floor(Math.random() * 151);
//     let pokemon = await $.getJSON(
//       `https://pokeapi.co/api/v2/pokemon/${pokeID}/`
//     );
//     let name = pokemon.name.toUpperCase();
//     let img = pokemon.sprites.front_default;
//     let species = await $.getJSON(
//       `https://pokeapi.co/api/v2/pokemon-species/${pokeID}`
//     );
//     let bio = species.flavor_text_entries.find(function(entry) {
//       return entry.version.name === 'ruby';
//     }).flavor_text;
//     $('#poke-holder').append(
//       `<div class="pokeman"><h2>${name}</h2><img src='${img}'><p>${bio}</p>`
//     );
//   }
// });
