/* ============================================================
   ZAMZAM CAFE & SHISHA LOUNGE
   JavaScript — Navigation, Animations, Form Validation + WA Redirect
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* =========================
     ELEMENTS
     ========================= */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  const allNavLinks = [...navLinks, ...mobileLinks];
  const sections = document.querySelectorAll('section[id]');
  const revealElements = document.querySelectorAll('.reveal');
  const yearEl = document.getElementById('current-year');
  const form = document.getElementById('reservation-form');
  const formSuccess = document.querySelector('.form-success');

  /* =========================
     MOBILE NAVIGATION
     ========================= */
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  /* =========================
     STICKY NAVBAR ON SCROLL
     ========================= */
  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* =========================
     SMOOTH SCROLLING
     ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* =========================
     ACTIVE NAVIGATION STATE
     ========================= */
  function updateActiveNav() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        allNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* =========================
     SCROLL REVEAL (IntersectionObserver)
     ========================= */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* =========================
     DYNAMIC YEAR
     ========================= */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================
     RESERVATION FORM VALIDATION + WA REDIRECT
     ========================= */
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset previous errors
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      let isValid = true;

      // Validate name
      const nameInput = form.querySelector('#res-name');
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Silakan masukkan nama Anda.');
        isValid = false;
      }

      // Validate date
      const dateInput = form.querySelector('#res-date');
      if (!dateInput.value) {
        showError(dateInput, 'Silakan pilih tanggal.');
        isValid = false;
      } else {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          showError(dateInput, 'Tanggal tidak boleh di masa lalu.');
          isValid = false;
        }
      }

      // Validate time
      const timeInput = form.querySelector('#res-time');
      if (!timeInput.value) {
        showError(timeInput, 'Silakan pilih waktu.');
        isValid = false;
      }

      // Validate guests
      const guestsInput = form.querySelector('#res-guests');
      if (!guestsInput.value) {
        showError(guestsInput, 'Silakan pilih jumlah tamu.');
        isValid = false;
      }

      if (!isValid) return;

      // --- BUILD WHATSAPP MESSAGE ---
      const nameVal = nameInput.value.trim();
      const dateVal = dateInput.value;
      const timeVal = timeInput.value;
      const guestsVal = guestsInput.value;
      const notesVal = form.querySelector('#res-notes').value.trim();

      // Format date: 2026-04-28 -> Selasa, 28 April 2026
      const dateObj = new Date(dateVal + 'T00:00:00');
      const formattedDate = dateObj.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const formattedTime = timeVal.replace(':', '.') + ' WIB';

      let message =
        `Halo Zamzam Cafe & Shisha Lounge, saya ingin *Reservasi Meja Makan*:\n\n` +
        `👤 Nama: ${nameVal}\n` +
        `📅 Tanggal: ${formattedDate}\n` +
        `⏰ Waktu: ${formattedTime}\n` +
        `👥 Jumlah Tamu: ${guestsVal} orang`;

      if (notesVal) {
        message += `\n📝 Permintaan Khusus: ${notesVal}`;
      }

      message += `\n\nMohon konfirmasinya, terima kasih!`;

      const waNumber = '6287822665674';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

      // Redirect ke WA - user tinggal kirim
      window.open(waUrl, '_blank', 'noopener');
    });
  }

  /* =========================
     TENNIS COURT RESERVATION FORM
     ========================= */
  const tennisForm = document.getElementById('tennis-reservation-form');
  if (tennisForm) {
    tennisForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset previous errors
      tennisForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      let isValid = true;

      // Validate name
      const nameInput = tennisForm.querySelector('#tennis-name');
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Silakan masukkan nama Anda.');
        isValid = false;
      }

      // Validate date
      const dateInput = tennisForm.querySelector('#tennis-date');
      if (!dateInput.value) {
        showError(dateInput, 'Silakan pilih tanggal.');
        isValid = false;
      } else {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          showError(dateInput, 'Tanggal tidak boleh di masa lalu.');
          isValid = false;
        }
      }

      // Validate time
      const timeInput = tennisForm.querySelector('#tennis-time');
      if (!timeInput.value) {
        showError(timeInput, 'Silakan pilih waktu.');
        isValid = false;
      }

      // Validate players
      const playersInput = tennisForm.querySelector('#tennis-players');
      if (!playersInput.value) {
        showError(playersInput, 'Silakan pilih jumlah pemain.');
        isValid = false;
      }

      if (!isValid) return;

      // --- BUILD WHATSAPP MESSAGE ---
      const nameVal = nameInput.value.trim();
      const dateVal = dateInput.value;
      const timeVal = timeInput.value;
      const playersVal = playersInput.value;
      const notesVal = tennisForm.querySelector('#tennis-notes').value.trim();

      // Format date: 2026-04-28 -> Selasa, 28 April 2026
      const dateObj = new Date(dateVal + 'T00:00:00');
      const formattedDate = dateObj.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const formattedTime = timeVal.replace(':', '.') + ' WIB';

      let message =
        `Halo Zamzam Cafe & Shisha Lounge, saya ingin *Reservasi Lapangan Tennis*:\n\n` +
        `👤 Nama: ${nameVal}\n` +
        `📅 Tanggal: ${formattedDate}\n` +
        `⏰ Waktu: ${formattedTime}\n` +
        `👥 Jumlah Pemain: ${playersVal} orang`;

      if (notesVal) {
        message += `\n📝 Permintaan Khusus: ${notesVal}`;
      }

      message += `\n\nMohon konfirmasinya, terima kasih!`;

      const waNumber = '6287822665674';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

      // Redirect ke WA - user tinggal kirim
      window.open(waUrl, '_blank', 'noopener');
    });
  }

  function showError(input, message) {
    const group = input.closest('.form-group');
    if (group) {
      group.classList.add('error');
      const errorEl = group.querySelector('.form-error');
      if (errorEl) {
        errorEl.textContent = message;
      }
    }
  }

  /* =========================
     SET MINIMUM DATE FOR RESERVATION
     ========================= */
  const resDateInput = document.querySelector('#res-date');
  if (resDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    resDateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
  }

  const tennisDateInput = document.querySelector('#tennis-date');
  if (tennisDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    tennisDateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
  }

  /* =========================
     MODAL CONTROLS
     ========================= */
  const modalTable = document.getElementById('modal-table');
  const modalTennis = document.getElementById('modal-tennis');
  const openTableBtns = document.querySelectorAll('.js-open-table, a[href="#reservasi"]');
  const openTennisBtns = document.querySelectorAll('.js-open-tennis');
  const closeBtns = document.querySelectorAll('.js-close-modal');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function closeAllModals() {
    [modalTable, modalTennis].forEach(modal => {
      if (modal && modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
  }

  openTableBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Allow scroll behavior for navbar link if desired, or open modal directly
      e.preventDefault();
      openModal(modalTable);
    });
  });

  openTennisBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalTennis);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  /* =========================
     INITIAL STATES
     ========================= */
  handleNavScroll();
  updateActiveNav();
});