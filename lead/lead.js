(function () {
  var FN_URL = 'https://bnyaknuibngvikfktecq.supabase.co/functions/v1/lead-capture';
  var ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJueWFrbnVpYm5ndmlrZmt0ZWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MzUxNzQsImV4cCI6MjA5MDExMTE3NH0.CZxT9XxF6eiwwTy2eDK5XUkun-nTMsbXYljt16gT_DU';

  var form = document.getElementById('lm-form');
  if (!form) return;
  var btn = form.querySelector('.lm-btn');
  var msg = document.getElementById('lm-msg');
  var magnet = form.getAttribute('data-magnet');
  var redirect = form.getAttribute('data-redirect');

  function show(text, kind) {
    msg.textContent = text;
    msg.className = 'lm-msg ' + (kind || '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = form.email.value.trim();
    var name = form.name.value.trim();
    var hp = form.company.value;
    var consent = form.consent.checked;

    if (!email || email.indexOf('@') === -1) { show('Please enter a valid email.', 'err'); return; }
    if (!consent) { show('Please tick the box so we can send you the guide.', 'err'); return; }

    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    show('', '');

    fetch(FN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': ANON, 'Authorization': 'Bearer ' + ANON },
      body: JSON.stringify({ magnet: magnet, email: email, name: name, hp: hp })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok && res.d && res.d.ok) {
          show('Perfect. Opening your guide...', 'ok');
          if (window.attuneTrack) window.attuneTrack('lead_submit', { magnet: magnet, page: window.location.pathname });
          window.location.href = redirect;
        } else {
          btn.disabled = false;
          btn.textContent = label;
          show((res.d && res.d.error) || 'Something went wrong. Please try again.', 'err');
        }
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = label;
        show('Network error. Please try again.', 'err');
      });
  });
})();
