export function showPageError(message) {
  let el = document.getElementById('page-error');
  if (!el) {
    el = document.createElement('p');
    el.id = 'page-error';
    el.className = 'field-error';
    document.querySelector('main')?.prepend(el);
  }
  el.textContent = message;
}
