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
