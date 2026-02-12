// Mobile menu toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Optional: show a message after Formspree submission (without breaking normal behavior)
function attachFormMessage(formId, msgId) {
  const form = document.getElementById(formId);
  const msg = document.getElementById(msgId);
  if (!form || !msg) return;

  form.addEventListener("submit", () => {
    msg.textContent = "Sending…";
    msg.style.opacity = "1";
  });

  // If Formspree redirects back with ?success=1 (optional), show success message
  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "1") {
    msg.textContent = "Thanks! Your message was sent successfully. We’ll be in touch soon.";
    msg.style.opacity = "1";
  }
}

attachFormMessage("miniForm", "miniFormMsg");
attachFormMessage("contactForm", "contactFormMsg");

// ✅ EmailJS setup + send on submit
document.addEventListener("DOMContentLoaded", () => {
  // 1) Put your EmailJS public key here
  emailjs.init("XQFxyP0UJ0_o5JMko");

  function wireEmailJS(formId, msgId) {
    const form = document.getElementById(formId);
    const msg = document.getElementById(msgId);
    if (!form || !msg) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      msg.textContent = "Sending…";
      msg.style.opacity = "1";

      emailjs.sendForm(
        "service_bd1mrrc",
        "template_m3jcldd",
        form
      )
      .then(() => {
        msg.textContent = "✅ Thanks! We received your request. We’ll contact you shortly.";
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        msg.textContent = "❌ Failed to send. Please try again, or WhatsApp us.";
      });
    });
  }

  wireEmailJS("miniForm", "miniFormMsg");
  wireEmailJS("contactForm", "contactFormMsg");
});
