// App
var grammar = function() {

    function attachEvent() {
        document.addEventListener('click', function listener(event) {
            checkTarget(event);
        }, false);
    }

    // Init
    attachEvent();


    function checkTarget(event) {
        var hash = event.target.href.split("#")[1];

        if ( ( event.target.className === 'aid-related' ) || ( event.target.parentNode.className === 'aid-related' ) ) {
            smoothScrollTo(hash);
            sendGa(hash, false);
        }
        else if ( ( event.target.className === 'aid-list-a' ) || ( event.target.parentNode.className === 'aid-list-a' ) ) {
            smoothScrollTo(hash);
            sendGa(hash, true);
        }
        else if ( event.target.className === 'btn btn-block btn-fb') {
            sendGaShare(event, 'Facebook');
        }
        else if ( event.target.className === 'btn btn-block btn-tw') {
            sendGaShare(event, 'Twitter');
        }
        else if (event.target.id === 'main-share-fb' ) {
            sendGaMainShare('Facebook');
        }
        else if ( event.target.id === 'main-share-tw' ) {
            sendGaMainShare('Twitter');
        }
    }


    /// tu trzeba poprawić
    function sendGa(anchor, list) {
        if (list) {
            ga('send', 'event', 'Anchors', anchor, "List");
        } else {
            ga('send', 'event', 'Anchors', anchor, "Related");
        }
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

}();


//window.addEventListener("load", function load(event){
//    window.removeEventListener("load", load, false);    // remove listener, no longer needed
//
//},false);


// Scroll
function animation(effectFrame, duration, from, to, easing, framespacing) {
    var start = Date.now(), change;

    if (animation.existing) { window.clearTimeout(animation.existing); }

    duration = duration || 500;
    if (typeof from === 'function') {
        easing = from;
        from = 0;
    }
    easing = easing || function (x, t, b, c, d) {
        if ( (t/=d/2) < 1 ) { return c/2*t*t + b };
        return -c/2 * ((--t)*(t-2) - 1) + b;
    };
    from = from || 0;
    to = to || 1;
    framespacing = framespacing || 1;
    change = to - from;

    (function interval() {
        var time = Date.now() - start;
        if (time < duration) {
            effectFrame(easing(100, time, from, change, duration));
            animation.existing = window.setTimeout(interval, framespacing);
        } else { effectFrame(to); }
    }());
}

window.smoothScrollTo = function (t, duration) {
    var elm = document.getElementById(t);
    var target = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        target += node.offsetTop;
        target += 0;
    }
    var start;
    if (self.pageYOffset) { start = self.pageYOffset; }
    if (document.documentElement && document.documentElement.scrollTop) { start = document.documentElement.scrollTop; }
    if (document.body.scrollTop) { start = document.body.scrollTop; }
    duration = duration || 600;
    animation(function (position) { window.scroll(0,position); }, duration, start, target);
};