(function () {
  var KEY = 'ivoryante-legal-lang';
  var supported = { en: 1, 'zh-Hans': 1, nl: 1, sv: 1, nb: 1, da: 1 };

  function detect() {
    var saved = localStorage.getItem(KEY);
    if (saved && supported[saved]) return saved;
    var nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('zh') === 0) return 'zh-Hans';
    if (nav.indexOf('nl') === 0) return 'nl';
    if (nav.indexOf('sv') === 0) return 'sv';
    if (nav.indexOf('nb') === 0 || nav.indexOf('no') === 0 || nav.indexOf('nn') === 0) return 'nb';
    if (nav.indexOf('da') === 0) return 'da';
    return 'en';
  }

  function apply(lang) {
    if (!supported[lang]) lang = 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-i18n-lang') !== lang;
    });
    document.querySelectorAll('.lang-bar button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    localStorage.setItem(KEY, lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-bar button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        apply(btn.getAttribute('data-lang'));
      });
    });
    apply(detect());
  });
})();
