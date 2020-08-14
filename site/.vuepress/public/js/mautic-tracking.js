(function() {
  (function(w, d, t, u, n, a, m) {
w['MauticTrackingObject']=n;
    w[n]=w[n]||function() {
(w[n].q=w[n].q||[]).push(w, d, t, u, n, a, m);
}, a=d.createElement(t),
        m=d.getElementsByTagName(t)[0]; a.async=1; a.src=u; m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://mautic.thinktandem.io/mtc.js', 'mt');

  mt('send', 'pageview');
})();
