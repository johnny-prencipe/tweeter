$(document).ready(function() {
  $("#tweet-text").on("input", function() {
      let length = $(this).val().length;
      let $counter = $(".counter");
      $counter.val(140 - length);

      $counter.val() < 0 ?
      $counter.css({ color: "red" }) :
      $counter.css({ color: "#545149" });
  });
});