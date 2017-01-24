$(document).ready(function(){
  $('.tabs__header a').click(function(e) {
    e.preventDefault();
    $('.tabs__header .tabs__switch--active').removeClass('tabs__switch--active');
    $(this).addClass('tabs__switch--active');
    var tab = $(this).attr('href');
    $('.tabs__content').not(tab).css({'display':'none'});
    $(tab).fadeIn(100);
  });
});