/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('#err-too-long').hide();
  $('#err-too-short').hide();
  console.log('Document ready');

  // Escape function to protect against XSS vulnerability //

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const renderTweets = function(tweets) {
    $("#tweet-container").empty();
    for (let tweet of tweets) {
      $("#tweet-container").prepend(createTweetElement(tweet));
    }
  }

  // Create a new tweet element //

  function createTweetElement(tweet) {
    const $newTweet = `
    <article>
    
      <header class="tweet">
        <div class="display-name">
          <img src="${tweet.user.avatars}" class="user-image"></img>
          ${tweet.user.name}
        </div>
        <div class="userID">${tweet.user.handle}</div>
      </header>

      ${escape(tweet.content.text)}

      <footer class="tweet">${new Date(tweet.created_at)}
        <div class="font-awesome">
          <i class="far fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
        </div>
      </footer>

    </article>
    `;
    return $newTweet;
  }

  // Load tweets from database //

  const loadTweets = function() {
    $('#tweet-text').val('');
    $('.counter').val('140');
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log('tweets loaded:', data)
        renderTweets(data);
      }
    })
  }

  // Call the loadTweets function on page load //

  loadTweets();

  // Submit tweet from form to database //

  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    console.log(tweet);
    if (tweet.length > 140) {
      return ($('#err-too-long').slideDown());
    }
    console.log(tweet.length);
    if (tweet.length === 5) {
      return ($('#err-too-short').slideDown());
    }
    $('#err-too-long').slideUp()
    $('#err-too-short').slideUp()
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: tweet
    }).then(loadTweets);
  });
});