document.documentElement.classList.add('js');

const root = document.documentElement;
const languageButtons = {
  en: document.getElementById('lang-en'),
  ar: document.getElementById('lang-ar')
};
const menuButton = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const topicSelect = document.getElementById('contact-topic');
let currentLanguage = 'en';
let topicIndex = 0;

function setLanguage(language) {
  currentLanguage = language;
  const isArabic = language === 'ar';
  root.lang = language;
  root.dir = isArabic ? 'rtl' : 'ltr';
  languageButtons.en.setAttribute('aria-pressed', String(!isArabic));
  languageButtons.ar.setAttribute('aria-pressed', String(isArabic));
  document.title = isArabic
    ? 'AOE3 — معهد المعايير والأكاديمية المهنية'
    : 'AOE3 — Standards Institute & Professional Academy';

  if (topicSelect) {
    topicSelect.selectedIndex = topicIndex * 2 + (isArabic ? 1 : 0);
  }

  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal').forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
        element.classList.add('is-visible');
      }
    });
  });
}

languageButtons.en.addEventListener('click', () => setLanguage('en'));
languageButtons.ar.addEventListener('click', () => setLanguage('ar'));
topicSelect?.addEventListener('change', () => {
  topicIndex = Math.floor(topicSelect.selectedIndex / 2);
});

function closeMenu(returnFocus = false) {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const willOpen = mobileNav.hidden;
  mobileNav.hidden = !willOpen;
  menuButton.setAttribute('aria-expanded', String(willOpen));
  if (willOpen) mobileNav.querySelector('a:not([hidden])')?.focus();
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true);
});

document.addEventListener('click', (event) => {
  if (!mobileNav.hidden && !event.target.closest('#site-header')) closeMenu();
});

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('is-visible');
});

const distinctionSection = document.getElementById('distinctions-scroll');
const distinctionStates = [...document.querySelectorAll('.distinction-state')];
const distinctionCopies = [...document.querySelectorAll('.distinction-copy')];
const distinctionNumber = document.getElementById('distinction-number');
const progressFill = document.getElementById('progress-fill');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopMotion = window.matchMedia('(min-width: 1060px)');
let activeDistinction = -1;
let scrollTicking = false;

function renderDistinction(index, progress) {
  if (index === activeDistinction) {
    progressFill.style.transform = `scaleY(${progress})`;
    return;
  }
  activeDistinction = index;
  distinctionStates.forEach((state) => {
    state.classList.toggle('active', Number(state.dataset.state) === index);
  });
  distinctionCopies.forEach((copy) => {
    copy.classList.toggle('active', Number(copy.dataset.copy) === index);
  });
  distinctionNumber.textContent = String(index + 1).padStart(2, '0');
  progressFill.style.transform = `scaleY(${progress})`;
}

function updateDistinctions() {
  scrollTicking = false;
  if (!distinctionSection || reducedMotion.matches || !desktopMotion.matches) return;
  const rect = distinctionSection.getBoundingClientRect();
  const scrollable = Math.max(1, rect.height - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
  const index = Math.min(3, Math.floor(progress * 4));
  renderDistinction(index, progress);
}

function requestDistinctionUpdate() {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(updateDistinctions);
  }
}

window.addEventListener('scroll', requestDistinctionUpdate, { passive: true });
window.addEventListener('resize', requestDistinctionUpdate);
reducedMotion.addEventListener('change', requestDistinctionUpdate);
desktopMotion.addEventListener('change', requestDistinctionUpdate);
renderDistinction(0, 0);
updateDistinctions();

const inquiryForm = document.getElementById('inquiry-form');
const formStatus = document.getElementById('form-status');

inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;

  const isArabic = currentLanguage === 'ar';
  const name = document.getElementById('contact-name').value.trim();
  const organization = document.getElementById('contact-org').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const topic = topicSelect.options[topicSelect.selectedIndex].textContent.trim();
  const message = document.getElementById('contact-message').value.trim();
  const date = new Date().toISOString().slice(0, 10);

  const draft = isArabic
    ? `مسودة استفسار AOE3\nالتاريخ: ${date}\n\nالاسم: ${name}\nالجهة: ${organization || 'غير محدد'}\nالبريد الإلكتروني: ${email}\nنوع الاستفسار: ${topic}\n\nالرسالة:\n${message}\n\nملاحظة: أُنشئت هذه المسودة محليًا ولم تُرسل إلى أي جهة.\n`
    : `AOE3 Inquiry Draft\nDate: ${date}\n\nName: ${name}\nOrganization: ${organization || 'Not specified'}\nEmail: ${email}\nInquiry type: ${topic}\n\nMessage:\n${message}\n\nNote: This draft was created locally and has not been sent to anyone.\n`;

  const blob = new Blob([draft], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const download = document.createElement('a');
  download.href = url;
  download.download = `AOE3-inquiry-draft-${date}.txt`;
  document.body.appendChild(download);
  download.click();
  download.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  formStatus.textContent = isArabic
    ? 'تم تنزيل المسودة. لم تُرسل أي بيانات.'
    : 'Draft downloaded. No data was transmitted.';
});
