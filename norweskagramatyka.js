
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

  var debug = false;

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
    var feedbackEl;
    var feedback;
    var aidEl;
    var parent;
    var elWithHref = getParentWithAtt( event.target, 'href' );

    showDebugMsg( elWithHref );


    if ( elWithHref ) {
      hash = elWithHref.href.split('#')[1];
      url = elWithHref.href.split('#')[0];
    }


    //  anchor to current page
    if ( hash && url && ( url === currentUrl ) ) {

      showDebugMsg( 'hash: ' + hash );

      ga('send', 'event', 'Problems', '#' + hash, "Hash");

      //  check if it is a sublist
      if ( sublists.hasOwnProperty( hash ) ) {

        showDebugMsg('sublists ma prop');

        toggleSublist( sublists[ hash ] );

        event.preventDefault();
        event.stopPropagation();
        return;

      }


      //  check if jsClasses has the prop
      if ( problems.indexOf( hash ) >= 0  ) {

        showDebugMsg('problems list has hash, add class');

        main.className = mainClass + ' js__hidden js__' + hash;

      }


      Velocity(
        document.getElementById( hash ),
        'scroll',
        { duration: 800, easing: 'easeInOutQuart' }
      );
      return;

    }
    //  it should be outbound link
    else if ( url && ( url !== currentUrl ) ) {

      ga('send', 'event', 'Outgoing', url, 'Link');

    }

    //  Data Feedback
    feedbackEl = getParentWithAtt( event.target, 'data-feedback' );

    if ( feedbackEl ) {
      feedback = feedbackEl.getAttribute('data-feedback');
      aidEl = getParentWithId( event.target );
    }

    //  If there is feedback and found aidEl
    if ( aidEl && feedback ) {

      showDebugMsg( 'aidId: ' + aidEl.id + ' | feedback: ' + feedback );

      ga('send', 'event', 'Feedback', '#' + aidEl.id, feedback);

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

      showDebugMsg('hide active section');
      showDebugMsg(el);
    }

    //  el is not active
    if ( activeSubsection === el ) {

      activeSubsection = '';

      showDebugMsg('reset active section');

    }
    else {

        //  show el
        Velocity(
          el,
          'slideDown',
          { duration: 400, easing: 'easeInOutQuart' }
        );

        activeSubsection = el;

        showDebugMsg('show new section');
        showDebugMsg(el);

    }

  }


  //  check what user is linking to
  //  change the main class so the view from the hash remains
  function checkHash() {

    var currentUrl = window.location.href;
    var currentHash = currentUrl.split('#')[1];

    if ( currentHash && ( currentHash.length > 0 ) && ( problems.indexOf( currentHash ) >= 0 ) ) {

      main.className = mainClass + ' js__hidden js__' + currentHash;

      showDebugMsg('Class: ' + mainClass + ' js__hidden js__' + currentHash);

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

    showDebugMsg('h: ' + h );

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

    showDebugMsg('no: ' + no );

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


  function getParentWithAtt( el, att ) {

    var parent;

    if ( el.hasAttribute( att ) ) {
      return el;
    }

    parent = el.parentNode;

    while ( !parent.hasAttribute( att ) ) {

      parent = parent.parentNode;

      if ( parent == document.body ) {
        return false;
      }


    }

    return parent;

  }

  function getParentWithId( el ) {

    return getParentWithAtt( el, 'id' );

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



  function showDebugMsg( msg ) {

    if ( !debug ) {
      return;
    }

    window.console.log( msg );

  }



}();


//  attribute polyfill
;(function(prototype) {
  prototype.hasAttribute = prototype.hasAttribute || function(name) {
      return !!(this.attributes[name] &&
                this.attributes[name].specified);
  }
})(Element.prototype);