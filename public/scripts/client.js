/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  console.log('Document ready');


  // Driver code for tweet data //

  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //     "handle": "@SirIsaac"
  //     },
  //   "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //   "created_at": 1461116232227
  // }

  // Render the tweets on the page //

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $("#tweet-container").prepend(createTweetElement(tweet));
    }
  }


  // Create a new tweet element //

  function createTweetElement(tweet) {
    const $newTweet = `

    <header class="tweet">
      <div class="display-name">
        <img src="${tweet.user.avatars}" class="user-image"></img>
        ${tweet.user.name}
      </div>
      <div class="userID">${tweet.user.handle}</div>
    </header>
    ${tweet.content.text}
    <footer class="tweet">${tweet.created_at}</footer>
    `;
    return $newTweet;
  }

  // Load tweets from the database //
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

  loadTweets();
  // Submit tweet from form to the database //

  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    console.log(tweet);
    if (tweet.length > 140) {
      return alert('error: too many characters');
    }
    console.log(tweet.length);
    if (tweet.length === 5) {
      return alert('error: tweet field empty');
    }
    
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: tweet
    }).then(loadTweets);
  });


  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});