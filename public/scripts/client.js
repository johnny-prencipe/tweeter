/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  console.log('Document ready');

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $("#tweet-container").prepend(createTweetElement(tweet));
    }
  }

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


  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $(this).serialize()
    }).then(console.log('Post made'));
  });

  function newTweet(event) {
    // event.preventDefault();
    // $('new-tweet form').on('submit', function(event) {
    //   console.log('asd');
    // });


    const tweetText = $('.new-tweet form #tweet-text').val();
  }


  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});