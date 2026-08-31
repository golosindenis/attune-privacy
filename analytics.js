/* Attune marketing site analytics.
   ONE THING TO DO: replace G-XXXXXXXXXX below with the real GA4 Measurement ID
   (GA4 admin > Data streams > your web stream > Measurement ID).
   Until then every call below is a silent no op, so nothing breaks and no
   half configured data is collected. */
(function () {
  var MEASUREMENT_ID = 'G-XXXXXXXXXX';
  var CONFIGURED = MEASUREMENT_ID.indexOf('X') === -1;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  if (CONFIGURED) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID, { anonymize_ip: true });
  }

  /* The only public surface. Safe to call from anywhere, any time. */
  window.attuneTrack = function (name, params) {
    if (!CONFIGURED) return;
    try { gtag('event', name, params || {}); } catch (e) {}
  };

  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    /* click_download: every route to the App Store, wherever it sits. */
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href*="apps.apple.com"]');
      if (!a) return;
      window.attuneTrack('click_download', {
        location: a.getAttribute('data-track-location') || 'unattributed',
        page: window.location.pathname
      });
    }, true);

    /* view_pricing: fires once, when the pricing block is actually seen. */
    var pricing = document.getElementById('pricing');
    if (pricing && 'IntersectionObserver' in window) {
      var seen = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !seen) {
            seen = true;
            window.attuneTrack('view_pricing', { page: window.location.pathname });
            io.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io.observe(pricing);
    }

    /* coach_book: any route into the coach funnel. */
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-track="coach_book"]');
      if (!a) return;
      window.attuneTrack('coach_book', {
        location: a.getAttribute('data-track-location') || 'unattributed',
        page: window.location.pathname
      });
    }, true);
  });
})();
