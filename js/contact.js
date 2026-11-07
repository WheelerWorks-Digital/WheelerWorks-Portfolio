// Contact page: Formspree submit.
// Kept in its own file so the Content-Security-Policy can block inline scripts.

// Send through Formspree without leaving the page, then show the thank-you message.
// Without JavaScript the form still posts normally to Formspree.
(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'full form-status';
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      status.className = 'full form-status error';
      status.textContent = "The form isn't connected yet. Please check back soon.";
      return;
    }
    status.textContent = 'Sending…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('Formspree returned ' + r.status);
        status.textContent = '';
        document.getElementById('who').textContent = (form.elements.name.value.trim() || 'there').split(' ')[0];
        document.getElementById('contact-card').classList.add('sent');
      })
      .catch(function () {
        status.className = 'full form-status error';
        status.textContent = 'Something went wrong sending your message. Please try again in a minute.';
      });
  });
})();
