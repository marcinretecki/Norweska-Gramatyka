function animation(e,t,n,o,a,i){var r=Date.now(),s;animation.existing&&window.clearTimeout(animation.existing),t=t||500,"function"==typeof n&&(a=n,n=0),a=a||function(e,t,n,o,a){return(t/=a/2)<1?o/2*t*t+n:-o/2*(--t*(t-2)-1)+n},n=n||0,o=o||1,i=i||1,s=o-n,function l(){var c=Date.now()-r;t>c?(e(a(100,c,n,s,t)),animation.existing=window.setTimeout(l,i)):e(o)}()}var grammar=function(){function e(){document.addEventListener("click",function e(n){t(n)},!1)}function t(e){"aid-anchor"===e.target.className||"aid-anchor"===e.target.parentNode.className?n(e,!1):"aid-related"===e.target.className||"aid-related"===e.target.parentNode.className?n(e,!0):"btn btn-block btn-fb"===e.target.className?r(e,"Facebook"):"btn btn-block btn-tw"===e.target.className&&r(e,"Twitter")}function n(e,t){e.preventDefault();var n=e.target,r,l,c,d;n.href?(r=n.href.split("#")[1],d=s(n.innerHTML)):n.parentNode.href?(r=n.parentNode.href.split("#")[1],d=s(n.parentNode.innerHTML)):r=!1,r&&"!"!==r&&(l=document.getElementById(r),c=l.querySelector(".aid-hidden"),t||"aid-item"===l.className?(o(l,c),smoothScrollTo(r),i(d,t),history&&history.replaceState&&history.replaceState({},"",n.href)):(a(l,c),i(d,t,!0),history&&history.replaceState&&history.replaceState({},"","#!")))}function o(e,t){var n,o;t.style.position="absolute",t.style.height="auto",n=t.offsetHeight,t.style.height=0,t.style.position=null,o=t.offsetHeight,t.style.height=n+"px",e.className="aid-item aid-item-open"}function a(e,t){t.style.height=null,e.className="aid-item"}function i(e,t,n){t?ga("send","event","Anchors",e,"Related"):n?ga("send","event","Anchors",e,"Close"):ga("send","event","Anchors",e,"List")}function r(e,t){var n=e.target.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML;ga("send","event","Share",n,t)}function s(e){return String(e).replace(/<i>/g,"").replace(/<\/i>/g,"").replace(/"/g,"")}e()}();window.addEventListener("load",function e(t){window.removeEventListener("load",e,!1);var n=document.location.href.split("#")[1];if(n&&"!"!==n){var o=document.getElementById(n),a=o.querySelector(".aid-hidden"),i;"aid-item"===o.className&&(o.className="aid-item aid-item-open",a.style.height="auto",i=a.offsetHeight,a.style.height=i+"px")}},!1),window.smoothScrollTo=function(e,t){for(var n=document.getElementById(e),o=n.offsetTop,a=n;a.offsetParent&&a.offsetParent!==document.body;)a=a.offsetParent,o+=a.offsetTop,o+=0;var i;self.pageYOffset&&(i=self.pageYOffset),document.documentElement&&document.documentElement.scrollTop&&(i=document.documentElement.scrollTop),document.body.scrollTop&&(i=document.body.scrollTop),t=t||600,animation(function(e){window.scroll(0,e)},t,i,o)};