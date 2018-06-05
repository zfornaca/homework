// 1
$.getJSON('https://swapi.co/api/')
  .then(result => console.log(result))
  .catch(err => console.log(err));

// 2
$.getJSON('https://swapi.co/api/films/')
  .then(resource => {
    // console.log(resource)
    return resource.results.forEach(function(val) {
      console.log(`${val.title} - ${val.director}`);
    });
  })
  .catch(err => console.log('fml'));

// 3
$.getJSON('https://swapi.co/api/planets/1/')
  .then(result => {
    return result.residents.forEach(function(val) {
      $.getJSON(val).then(result => {
        console.log(result.name);
      });
    });
  })
  .catch(err => console.log(err));

// 4
var promise1 = $
  .getJSON('https://swapi.co/api/people/1/')
  .then(result => `${result.name} has saved the galaxy`)
  .catch(err => console.log(err));

var promise2 = $
  .getJSON('https://swapi.co/api/people/4/')
  .then(result => `The galaxy has fallen to ${result.name}`)
  .catch(err => console.log(err));

Promise.race([promise1, promise2])
  .then(result => console.log(result))
  .catch(err => console.log(err));
