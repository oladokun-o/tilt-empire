const storage = sessionStorage;

function ready() {
    if (storage.getItem('newsletter') === 'false' || !storage.getItem('newsletter')) {
      storage.setItem('newsletter', false);
      setTimeout(() => {
        document.querySelector('#newslettertrigger')?.click();
      }, 15000);
    }
}

function news() {
    storage.setItem('newsletter', true);
}

function show(class_) {
    var element = document.querySelector('.' + class_);
    console.log(class_)
    if (element === null || element === void 0 ? void 0 : element.classList.contains('d-none'))
        element.classList.remove('d-none');
        element.classList.add('d-block')
}

function hide(class_) {
    var element = document.querySelector('.' + class_);
    if (element === null || element === void 0 ? void 0 : element.classList.contains('d-block'))
        element.classList.remove('d-block');
        element.classList.add('d-none');
}

function showChevUp() {
    hide('chev-up');
    show('chev-down');
}

function showChevDown() {
    hide('chev-down');
    show('chev-up');
}

var menu = document.querySelector('.menu');

function openMenu() {
    menu.classList.add('slide-in-right');
    menu.classList.remove('slide-out-right');
}

function closeMenu() {
    menu.classList.add('slide-out-right');
    menu.classList.remove('slide-in-right');
}

function selectMenu() {
    closeMenu();
}

$('#play-video').on('click', function(e){
    e.preventDefault();
    $('#video-overlay').addClass('open');
    $("#video-overlay").append('<iframe width="560" height="315" src="https://drive.google.com/file/d/1B4XVN9GaZ4aimxm-_vE_E_Ls1R3VPALP/preview" frameborder="0" allowfullscreen></iframe>');
  });

  $('.video-overlay, .video-overlay-close').on('click', function(e){
    e.preventDefault();
    close_video();
  });

  $(document).keyup(function(e){
    if(e.keyCode === 27) { close_video(); }
  });

  function close_video() {
    $('.video-overlay.open').removeClass('open').find('iframe').remove();
  };
