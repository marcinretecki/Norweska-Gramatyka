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
        if ( ( event.target.className === 'aid-anchor' ) || ( event.target.parentNode.className === 'aid-anchor' ) ) {
            toggleArticle(event, false);
        }
        else if ( ( event.target.className === 'aid-related' ) || ( event.target.parentNode.className === 'aid-related' ) ) {
            toggleArticle(event, true);
        }
    }

    function toggleArticle(event, onlyOpen) {

        event.preventDefault();

        var target = event.target,
            hash, article, child, anchor;

        if (target.href) {
            hash = target.href.split("#")[1];
            anchor = htmlEntities( target.innerHTML );
        }
        else if (target.parentNode.href) {
            hash = target.parentNode.href.split("#")[1];
            anchor = htmlEntities( target.parentNode.innerHTML );
        }
        else {
            hash = false;
        }

        if ( hash && (hash !== "!") ) {

            article = document.getElementById(hash);
            child = article.querySelector('.aid-hidden');

            if ( onlyOpen || ( article.className === 'aid-item' ) ) {
                openArticle(article, child);
                smoothScrollTo(hash);
                sendGa(anchor, onlyOpen);

                if (history && history.replaceState) { history.replaceState({}, "", target.href); }

            }
            else {
                closeArticle(article, child);
                sendGa(anchor, onlyOpen, true);

                if (history && history.replaceState) { history.replaceState({}, "", '#!'); }
            }

        }

    }


    function openArticle(article, child) {
        var height, heightZero;

        child.style.position = 'absolute';
        child.style.height = 'auto';

        height = child.offsetHeight;                // get the height to animate later

        child.style.height = 0;
        child.style.position = null;

        heightZero = child.offsetHeight;            // layout

        child.style.height = height + "px";         // animate height

        article.className = 'aid-item aid-item-open';
    }


    function closeArticle(article, child) {
        child.style.height = null;
        article.className = 'aid-item';
    }

    function sendGa(anchor, onlyOpen, close) {
        if (onlyOpen) {
            ga('send', 'event', 'Anchors', anchor, "Related");
        }
        else if (close) {
            ga('send', 'event', 'Anchors', anchor, "Close");
        } else {
            ga('send', 'event', 'Anchors', anchor, "List");
        }
    }

    function htmlEntities(str) {
        return String(str).replace(/<i>/g, '').replace(/<\/i>/g, '').replace(/"/g, '');
    }

}();


window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false);    // remove listener, no longer needed

    var hash = document.location.href.split("#")[1];

    if ( hash && (hash !== "!") ) {
        var article = document.getElementById(hash),
            child = article.querySelector('.aid-hidden'),
            height;

        if (article.className === 'aid-item') {
            article.className = 'aid-item aid-item-open';
            child.style.height = 'auto';

            height = child.offsetHeight;
            child.style.height = height + "px";     // set height for future anumation
        }
    }
},false);


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