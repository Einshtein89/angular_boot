

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

  $dropdown
    .dropdown({
      on: 'hover'
    })
  ;

  $('.ui.search')
    .search({
      type: 'category',
      apiSettings: {
        action: 'categorySearch'
      }
    })
  ;

  $('.school.example .browse.item')
    .popup({
      popup     : '.admission.popup',
      hoverable : true,
      position  : 'bottom left',
      delay     : {
        show: 300,
        hide: 800
      }
    })
  ;

  $popupItem
    .popup({
      inline   : true,
      hoverable: true,
      popup    : '.fluid.popup',
      position : 'bottom left',
      delay: {
        show: 300,
        hide: 800
      }
    })
  ;

  $menuItem
    .on('click', handler.activate)
  ;

});
