$(function() {
  const wordCount = 10;
  let guessCount = 4;
  let password = '';

  const start = $('#start')[0];
  $(start).on('click', function() {
    $('#start-screen').toggleClass('show hide');
    $('#game-screen').toggleClass('show hide');
    startGame();
  });

  function startGame() {
    // get random words and append them to the DOM
    const wordList = $('#word-list')[0];
    // 'words' variable is from words.js
    const randomWords = getRandomValues(words, wordCount); // eslint-disable-line no-undef
    randomWords.forEach(function(word) {
      const li = $('<li>');
      $(li).text(word);
      $(wordList).append(li);
    });

    // set a secret password and the guess count display
    password = getRandomValues(randomWords, 1)[0];
    setGuessCount(guessCount);

    // add update listener for clicking on a word
    $(wordList).on('click', updateGame);
  }

  function getRandomValues(array, numberOfVals) {
    return shuffle(array).slice(0, numberOfVals);
  }

  function shuffle(array) {
    var arrayCopy = [...array];
    for (var idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
      // generate a random index between 0 and idx1 (inclusive)
      var idx2 = Math.floor(Math.random() * (idx1 + 1));

      // swap elements at idx1 and idx2
      var temp = arrayCopy[idx1];
      arrayCopy[idx1] = arrayCopy[idx2];
      arrayCopy[idx2] = temp;
    }
    return arrayCopy;
  }

  function setGuessCount(newCount) {
    guessCount = newCount;
    $('#guesses-remaining').text(`Guesses remaining: ${guessCount}.`);
  }

  function updateGame(e) {
    if (e.target.tagName === 'LI' && !e.target.classList.contains('disabled')) {
      // grab guessed word, check it against password, update view
      const guess = e.target.innerText;
      const similarityScore = compareWords(guess, password);
      e.target.classList.add('disabled');
      e.target.innerText = `${guess} --> Matching Letters: ${similarityScore}`;
      setGuessCount(guessCount - 1);

      // check whether the game is over
      if (similarityScore === password.length) {
        $('#winner').toggleClass('hide show');
        $(this)[0].off('click', updateGame);
      } else if (guessCount === 0) {
        $('#loser').toggleClass('hide show');
        $(this)[0].off('click', updateGame);
      }
    }
  }

  function compareWords(word1, word2) {
    if (word1.length !== word2.length) {
      throw 'Words must have the same length';
    }
    let count = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] === word2[i]) count++;
    }
    return count;
  }
});
