

// ready event
$(document).ready(function() {

  // selector cache
  var
    $dropdownItem = $('.menu .dropdown .item'),
    $popupItem    = $('.popup.example .browse.item'),
    $menuItem     = $('.menu a.item, .menu .link.item').not($dropdownItem),
    $dropdown     = $('.menu .ui.dropdown'),
    // alias
    handler = {

      activate: function() {
        if(!$(this).hasClass('dropdown browse')) {
          $(this)
            .addClass('active')
            .closest('.ui.menu')
            .find('.item')
              .not($(this))
              .removeClass('active')
          ;
        }
      }
    }
  ;

  $menuItem
    .on('click', handler.activate)
  ;

});
