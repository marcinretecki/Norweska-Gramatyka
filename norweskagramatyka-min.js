function animation(e,t,n,o,i,a){var r=Date.now(),l;animation.existing&&window.clearTimeout(animation.existing),t=t||500,"function"==typeof n&&(i=n,n=0),i=i||function(e,t,n,o,i){return(t/=i/2)<1?o/2*t*t+n:-o/2*(--t*(t-2)-1)+n},n=n||0,o=o||1,a=a||1,l=o-n,function s(){var c=Date.now()-r;t>c?(e(i(100,c,n,l,t)),animation.existing=window.setTimeout(s,a)):e(o)}()}var grammar=function(){function e(){document.addEventListener("click",function e(n){t(n)},!1)}function t(e){"aid-anchor"===e.target.className||"aid-anchor"===e.target.parentNode.className?n(e,!1):("aid-related"===e.target.className||"aid-related"===e.target.parentNode.className)&&n(e,!0)}function n(e,t){e.preventDefault();var n=e.target,l,s,c,d;n.href?(l=n.href.split("#")[1],d=r(n.innerHTML)):n.parentNode.href?(l=n.parentNode.href.split("#")[1],d=r(n.parentNode.innerHTML)):l=!1,l&&"!"!==l&&(s=document.getElementById(l),c=s.querySelector(".aid-hidden"),t||"aid-item"===s.className?(o(s,c),smoothScrollTo(l),a(d,t),history&&history.replaceState&&history.replaceState({},"",n.href)):(i(s,c),a(d,t),history&&history.replaceState&&history.replaceState({},"","#!")))}function o(e,t){var n,o;t.style.position="absolute",t.style.height="auto",n=t.offsetHeight,t.style.height=0,t.style.position=null,o=t.offsetHeight,t.style.height=n+"px",e.className="aid-item aid-item-open"}function i(e,t){t.style.height=null,e.className="aid-item"}function a(e,t){}function r(e){return String(e).replace(/<i>/g,"").replace(/<\/i>/g,"").replace(/"/g,"")}e()}();window.addEventListener("load",function e(t){window.removeEventListener("load",e,!1);var n=document.location.href.split("#")[1];if(n&&"!"!==n){var o=document.getElementById(n),i=o.querySelector(".aid-hidden"),a;"aid-item"===o.className&&(o.className="aid-item aid-item-open",i.style.height="auto",a=i.offsetHeight,i.style.height=a+"px")}},!1),window.smoothScrollTo=function(e,t){for(var n=document.getElementById(e),o=n.offsetTop,i=n;i.offsetParent&&i.offsetParent!==document.body;)i=i.offsetParent,o+=i.offsetTop,o+=0;var a;self.pageYOffset&&(a=self.pageYOffset),document.documentElement&&document.documentElement.scrollTop&&(a=document.documentElement.scrollTop),document.body.scrollTop&&(a=document.body.scrollTop),t=t||600,animation(function(e){window.scroll(0,e)},t,a,o)};