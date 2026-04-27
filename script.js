// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// EmailJS
emailjs.init('YvXbBZbiOaAtXzdYV');

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const templateParams = {
    name:    document.getElementById('name').value,
    email:   document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  emailjs.send('service_888z45v', 'template_76bgu4r', templateParams)
    .then(() => {
      btn.textContent = 'Sent ✓';
      btn.style.background = '#22c55e';
      e.target.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    })
    .catch(() => {
      btn.textContent = 'Failed — Try Again';
      btn.style.background = '#ef4444';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
      }, 3000);
    });
}
