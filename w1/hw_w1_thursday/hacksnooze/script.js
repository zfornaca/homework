var postCount = 0;

// expand/collapse function

$('#submit').on('click', toggleForm);

function toggleForm() {
  $('#formBox').slideToggle('fast');
}

// favorites/all toggle function

$('#favs').on('click', favFilter);

function favFilter(evt) {
  if ($(evt.target).text() === 'Favorites') {
    $(evt.target).text('All');
  } else {
    $(evt.target).text('Favorites');
  }
  $('.post:not(.favorite)').toggle();
  $('.rank').toggle();
}

// star/unstar function

$('.star').on('click', favSelect);

function favSelect(evt) {
  if ($(evt.target).text() === '☆') {
    $(evt.target).text('★');
  } else {
    $(evt.target).text('☆');
  }
  $(evt.target)
    .parent()
    .toggleClass('favorite');
}

// new submission function[s]

$('form').on('submit', newLink);

function getHostName(url) {
  // strip anything through // and past next /, strip anything past : or ?
  // split remaining string by .
  let arr = url
    .split('/')[2]
    .split(':')[0]
    .split('?')[0]
    .split('.');
  // okay, now if it's a .co.uk sort of URL we need to get three pieces, else two
  if (arr[arr.length - 1].length === 2 && arr[arr.length - 2].length === 2) {
    return (
      arr[arr.length - 3] +
      '.' +
      arr[arr.length - 2] +
      '.' +
      arr[arr.length - 1]
    );
  } else {
    return arr[arr.length - 2] + '.' + arr[arr.length - 1];
  }
}

function newLink(evt) {
  evt.preventDefault();
  let siteLabel = $('#siteLabel').val();
  let siteURL = $('#siteURL').val();
  let hostName = getHostName(siteURL);
  let newPost = buildPost(siteLabel, siteURL, hostName);
  $(newPost)
    .find('.star')
    .on('click', favSelect);
  $('ul').append(newPost);
  evt.target.reset();
}

function buildPost(siteLabel, siteURL, hostName) {
  let newPost = $('<li class="post">');
  postCount++;
  newPost.append($(`<div class="rank">${postCount}</>`)[0]);
  newPost.append($(`<div class="star">☆</div>`));
  let postContent = $('<div class="postContent">');
  postContent.append(
    $(`<span class="postTitle"><a href="${siteURL}">${siteLabel}</a>`)
  );
  let postOrigin = $(`<span class="postOrigin">(${hostName})</span>`);
  postContent.append(postOrigin[0]);
  newPost.append($(postContent));
  return newPost[0];
}

// TODO:
// I was able to strip the domain name out of the URL, but not able to filter all
// <li>s with a given domain name (postOrigin). I was trying to use the contains
// selector, but it doesn't seem to play nicely with parentheses. Since this was
// a bonus objective I'm leaving it as is.
