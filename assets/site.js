/* Noor site: optional progressive enhancement only. Everything works without this file. */
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var strip = d.querySelector('.strip');
  if (strip) {
    var slides = [].slice.call(strip.children), rtl = getComputedStyle(strip).direction === 'rtl';
    var reduce = matchMedia('(prefers-reduced-motion: reduce)');
    var current = function () {
      var r = strip.getBoundingClientRect(), best = 0, bd = Infinity;
      slides.forEach(function (li, i) {
        var b = li.getBoundingClientRect(), dist = Math.abs(rtl ? r.right - b.right : b.left - r.left);
        if (dist < bd) { bd = dist; best = i; }
      });
      return best;
    };
    [].forEach.call(d.querySelectorAll('.strip-ctl .cbtn'), function (btn) {
      btn.addEventListener('click', function () {
        var i = Math.max(0, Math.min(slides.length - 1, current() + Number(btn.dataset.dir)));
        slides[i].scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', inline: 'start', block: 'nearest' });
      });
    });
  }
  var heads = [].slice.call(d.querySelectorAll('.prose h2[id],.prose h3[id]'));
  var links = [].slice.call(d.querySelectorAll('.toc a'));
  if (heads.length && links.length && 'IntersectionObserver' in window) {
    var mark = function (id) { links.forEach(function (a) { if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); };
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) mark(e.target.id); }); }, { rootMargin: '-90px 0px -70% 0px' });
    heads.forEach(function (h) { io.observe(h); });
  }
})();
