'use strict';

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu(returnFocus = false) {
  header.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  const open = !header.classList.contains('menu-open');
  header.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && header.classList.contains('menu-open')) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
document.querySelector('#year').textContent = String(new Date().getFullYear());

// Keep the existing contact provider; success requires its positive response.
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const submitButton = form.querySelector('[type="submit"]');
let sending = false;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;
  sending = true;
  submitButton.disabled = true;
  form.setAttribute('aria-busy', 'true');
  submitButton.textContent = 'Enviando…';
  status.classList.remove('error');
  status.textContent = 'Enviando sua mensagem.';
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(form.action, {
      method: 'POST', body: new FormData(form),
      headers: { Accept: 'application/json' }, signal: controller.signal
    });
    if (!response.ok) throw new Error('Contact provider rejected the request');
    status.textContent = 'Mensagem enviada. Obrigado pelo contato!';
    form.reset();
  } catch {
    status.classList.add('error');
    status.textContent = 'Não foi possível confirmar o envio. Seu texto foi mantido. Você também pode entrar em contato pelo e-mail ou WhatsApp ao lado.';
  } finally {
    window.clearTimeout(timeout);
    sending = false;
    submitButton.disabled = false;
    form.removeAttribute('aria-busy');
    submitButton.replaceChildren(document.createTextNode('Enviar mensagem '));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    submitButton.append(arrow);
  }
});
