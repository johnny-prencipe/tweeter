$(document).ready(function() {
  $('#tweet-text').on('input', function() {
      const length = $(this).val().length;
      const $counter = $('.counter');
      $counter.val(140 - length);

      $counter.val() < 0 ?
      $counter.addClass('red') :
      $counter.removeClass('red');
  });
});