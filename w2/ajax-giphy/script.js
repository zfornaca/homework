$('form').on('submit', addGif);

function addGif(evt) {
  evt.preventDefault();
  let searchTerm = $('#searchTerm').val();
  console.log(searchTerm);
  $.getJSON(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC`,
    function(res) {
      let gifSrc = res.data[0].images.fixed_height.url;
      console.log(gifSrc);
      let $newGif = $(`<img src="${gifSrc}">`);
      $('#gifHolder').append($newGif);
      evt.target.reset();
    }
  );
}

$('#removeBtn').on('click', removeGifs);

function removeGifs(evt) {
  $('img').remove();
}
