
//
//  TODO
//
//  show zagadnienia btn only after scrolling down
//
//  splash screen or new green header
//
//  check #hash on init
//  then recreate state
//
//  open and scroll to submenu
//  at the same time, filter the list
//  after the click on submenu, show a helpfull note about this topic
//  encourage to read below
//  add aditional aids in the list that solve problems


//
//  Gramatyka App
//
var grammar = function() {
  "use strict";

  var main = document.getElementById('js__main');
  var mainClass = main.className;
  var activeSubsection = '';

  var sublists = {
    js__tid:            document.getElementById('js__tid'),
    js__verb:           document.getElementById('js__verb'),
    js__adjektiv:       document.getElementById('js__adjektiv'),
    js__substantiv:     document.getElementById('js__substantiv'),
    js__ordning:        document.getElementById('js__ordning'),
    js__pronomen:       document.getElementById('js__pronomen')
  };

  var problems = [
  'eiendomspronomen',
  'personlige-pronomen',
  'sporrepronomen',
  'refleksive-pronomen',
  'verb',
  'imperativ',
  'modale',
  'adjektiv',
  'gradering',
  'perfektum-partisipp',
  'sideordning',
  'underordning',
  'sporsmal',
  'syntaks',
  'substantiv',
  'determinativ',
  'genitiv',
  'presens-perfektum',
  'presens',
  'futurum',
  'preteritum',
  'passiv'
  ];


  function init() {

    attachMainEvent();
    checkHash();
    checkTime( new Date() );

  }


  //  Init
  init();





  function checkTarget(event) {

    var hash;
    var url;
    var currentUrl = window.location.href.split('#')[0];
    var dataFace;
    var aidId;
    var parent;

    if ( event.target.href ) {
      hash = event.target.href.split('#')[1];
      url = event.target.href.split('#')[0];
    }

    if ( event.target.parentNode.href ) {
      hash = event.target.parentNode.href.split('#')[1];
      url = event.target.parentNode.href.split('#')[0];
    }

    //  anchor to current page
    if ( hash && ( url === currentUrl ) ) {

      window.console.log( 'hash: ' + hash );

      //  check if it is a sublist
      if ( sublists.hasOwnProperty( hash ) ) {

        console.log('sublists ma prop');

        toggleSublist( sublists[ hash ] );

        console.log( activeSubsection );

        ga('send', 'event', 'Problems', '#' + hash, "Hash");

        event.preventDefault();
        event.stopPropagation();
        return;

      }


      //  check if jsClasses has the prop
      if ( problems.indexOf( hash ) >= 0  ) {

        console.log('problems list has hash, add class');

        main.className = mainClass + ' js__hidden js__' + hash;

      }


      Velocity(
        document.getElementById( hash ),
        'scroll',
        { duration: 800, easing: 'easeInOutQuart' }
      );
      return;

    }

    //  Data Face
    dataFace = event.target.getAttribute('data-face');

    if ( !dataFace ) {
      dataFace = event.target.parentNode.getAttribute('data-face');
    }

    if ( dataFace ) {
      aidId = getParentWithId( event.target );
    }

    //  If there is dataFace and found aidId
    if ( aidId && dataFace ) {

      console.log( 'aidId: ' + aidId + ' | dataFace: ' + dataFace );
      ga('send', 'event', 'Feedback', aidId, dataFace);

      showFeedback( event.target );

    }

  }


  function toggleSublist( el ) {

    //  if there is active subsection
    if ( activeSubsection && ( activeSubsection !== '' ) ) {
      //  hide activeSubsection
      Velocity(
        activeSubsection,
        'slideUp',
        { duration: 400, easing: 'easeInOutQuart' }
      );

      console.log('hide active section');
      console.log(el);
    }

    //  el is not active
    if ( activeSubsection === el ) {

      activeSubsection = '';

      console.log('reset active section');

    }
    else {

        //  show el
        Velocity(
          el,
          'slideDown',
          { duration: 400, easing: 'easeInOutQuart' }
        );

        activeSubsection = el;

        console.log('show new section');
        console.log(el);

    }

  }


  //  check what user is linking to
  //  change the main class so the view from the hash remains
  function checkHash() {

    var currentUrl = window.location.href;
    var currentHash = currentUrl.split('#')[1];

    if ( currentHash && ( currentHash.length > 0 ) && ( problems.indexOf( currentHash ) >= 0 ) ) {

      main.className = mainClass + ' js__hidden js__' + currentHash;

    }

  }


  //
  //  check time
  //  change the welcome msg
  //
  function checkTime( t ) {

    var heiEl = document.getElementById( 'js__hei' );

    var heiArr = [

      'Morn, morn',
      'God morgen',
      'God dag',      //  this one is default
      'God kveld'

    ];

    var no = 3;

    var h = t.getHours();

    console.log( h );

    if ( h < 5 ) {
      //  god kveld
      no = 3;
    }
    else if ( h < 7 ) {
      //  morn, morn
      no = 0;
    }
    else if ( h < 10 ) {
      //  god morgen
      no = 1;
    }
    else if ( h < 18 ) {
      //  god dag
      //  this one is default
      //  don't change anything
      no = -1;
    }
    //  else use 3 in var

    console.log( no );

    //  update elements html
    if ( ( no >= 0 ) && heiEl ) {

      heiEl.innerHTML = heiArr[ no ] + '!';

    }


  }



  function attachMainEvent() {
    document.addEventListener('click', function listener(event) {
      checkTarget(event);
    }, false);
  }


  function sendGaShare(event, media) {
    var anchor = event.target.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML;
    ga('send', 'event', 'Share', anchor, media);
  }


  function sendGaMainShare(media) {
    ga('send', 'event', 'Share', 'Main', media);
  }


  function htmlEntities(str) {
    return String(str).replace(/<i>/g, '').replace(/<\/i>/g, '').replace(/"/g, '');
  }


  function getParentWithId( el ) {

    var parent = el.parentNode;

    while ( !parent.id ) {

      parent = parent.parentNode;

    }

    return parent.id;

  }


  function showFeedback( el ) {

    var parent = el.parentNode;
    var thanks = document.createElement('div');

    while ( parent.className !== 'aid-footer__faces') {

      parent = parent.parentNode;

    }

    thanks.className = 'aid-feedback-thanks';
    thanks.innerHTML = 'Takk for tilbakemeldingen!';

    parent.appendChild( thanks );

    Velocity(
      thanks,
      'slideDown',
      { duration: 300, easing: 'easeInOutQuart' }
    );

  }



}();