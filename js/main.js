(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const P = window.PROFILE;
  const page = document.body.dataset.page;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- nav + footer ---------- */
  const pages = [
    ['index.html', 'Home', 'home'], ['about.html', 'About', 'about'],
    ['experience.html', 'Experience', 'experience'], ['projects.html', 'Projects', 'projects'],
    ['education.html', 'Education', 'education'], ['teaching.html', 'Teaching', 'teaching'],
    ['contact.html', 'Contact', 'contact']
  ];
  const nav = $('#nav');
  nav.innerHTML =
    `<a class="brand" href="index.html"><span class="brand-mark">A</span>${P.name}</a>
     <button class="menu-btn" aria-expanded="false" aria-controls="menu">Menu</button>
     <ul id="menu">${pages.map(p => `<li><a href="${p[0]}" class="${p[2] === page ? 'active' : ''}">${p[1]}</a></li>`).join('')}</ul>`;
  const menuBtn = $('.menu-btn', nav), menu = $('#menu');
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  $('#footer').innerHTML =
    `<div><a href="${P.github}" target="_blank" rel="noopener">GitHub</a><a href="mailto:${P.email}">Email</a><a href="contact.html">Contact</a></div>
     <p style="margin-top:14px">&copy; ${new Date().getFullYear()} ${P.name}. Built with HTML, CSS and JavaScript.</p>`;

  /* ---------- page transition ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:/.test(href)) return;
    if (reduce) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => (location.href = href), 340);
  });
  addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });

  /* ---------- 3D particle field background ---------- */
  const cv = $('#bg');
  if (cv) {
    const ctx = cv.getContext('2d');
    let W, H, dpr, mx = 0, my = 0, tx = 0, ty = 0, t = 0;
    const N = innerWidth < 700 ? 55 : 110;
    const pts = Array.from({ length: N }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 }));
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    };
    size(); addEventListener('resize', size);
    addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; });
    const frame = () => {
      t += .0025; mx += (tx - mx) * .04; my += (ty - my) * .04;
      ctx.clearRect(0, 0, W, H);
      const ay = t + mx * 1.2, ax = my * .9 + Math.sin(t) * .15;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const R = Math.min(W, H) * .85, cam = 3;
      const proj = pts.map(p => {
        let x = p.x * cy - p.z * sy, z = p.x * sy + p.z * cy;
        let y = p.y * cx - z * sx; z = p.y * sx + z * cx;
        const s = cam / (cam + z);
        return { x: W / 2 + x * R * s * .7, y: H / 2 + y * R * s * .7, s, z };
      });
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = proj[i].x - proj[j].x, dy = proj[i].y - proj[j].y, d = Math.hypot(dx, dy);
          if (d < 130 * dpr) {
            ctx.strokeStyle = `rgba(138,107,255,${(1 - d / (130 * dpr)) * .28})`;
            ctx.lineWidth = dpr * .8;
            ctx.beginPath(); ctx.moveTo(proj[i].x, proj[i].y); ctx.lineTo(proj[j].x, proj[j].y); ctx.stroke();
          }
        }
      }
      proj.forEach((p, i) => {
        ctx.fillStyle = i % 7 === 0 ? `rgba(62,232,200,${.35 + p.s * .3})` : `rgba(236,234,255,${.15 + p.s * .3})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, (1 + p.s * 1.8) * dpr, 0, 7); ctx.fill();
      });
      if (!reduce) requestAnimationFrame(frame);
    };
    frame();
  }

  /* ---------- 3D tilt ---------- */
  const bindTilt = el => {
    const max = +(el.dataset.tilt || 9);
    el.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.classList.remove('leave');
      el.style.setProperty('--ry', ((px - .5) * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--rx', ((.5 - py) * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--mx', (px * 100) + '%'); el.style.setProperty('--my', (py * 100) + '%');
    });
    el.addEventListener('pointerleave', () => {
      el.classList.add('leave'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
    });
  };
  const initTilt = root => { if (!reduce) $$('.tilt', root).forEach(bindTilt); };

  /* ---------- typed role line ---------- */
  const typed = $('#typed');
  if (typed) {
    if (reduce) typed.textContent = P.roles[0];
    else {
      let i = 0, c = 0, del = false;
      const tick = () => {
        const w = P.roles[i];
        typed.textContent = w.slice(0, c);
        if (!del && c === w.length) { del = true; return setTimeout(tick, 1600); }
        if (del && c === 0) { del = false; i = (i + 1) % P.roles.length; }
        c += del ? -1 : 1;
        setTimeout(tick, del ? 28 : 55);
      };
      tick();
    }
  }

  /* ---------- hero portrait follows the pointer ---------- */
  const portrait = $('#portrait');
  if (portrait && !reduce) {
    const stage = portrait.parentElement;
    stage.addEventListener('pointermove', e => {
      const r = stage.getBoundingClientRect();
      portrait.classList.remove('leave');
      portrait.style.setProperty('--ry', (((e.clientX - r.left) / r.width - .5) * 26) + 'deg');
      portrait.style.setProperty('--rx', ((.5 - (e.clientY - r.top) / r.height) * 20) + 'deg');
    });
    stage.addEventListener('pointerleave', () => {
      portrait.classList.add('leave'); portrait.style.setProperty('--rx', '0deg'); portrait.style.setProperty('--ry', '0deg');
    });
  }

  /* ---------- draggable skills cube ---------- */
  const scene = $('#scene');
  if (scene) {
    const cube = $('.cube', scene), C = window.CUBE;
    const cls = { front: 'f-front', right: 'f-right', back: 'f-back', left: 'f-left', top: 'f-top', bottom: 'f-bottom' };
    cube.innerHTML = Object.entries(C).map(([k, v]) => `<div class="face ${cls[k]}"><h4>${v[0]}</h4><p>${v[1]}</p></div>`).join('');
    let rx = -18, ry = 25, vx = 0, vy = reduce ? 0 : .35, drag = false, lx = 0, ly = 0;
    scene.addEventListener('pointerdown', e => { drag = true; lx = e.clientX; ly = e.clientY; scene.setPointerCapture(e.pointerId); });
    scene.addEventListener('pointermove', e => {
      if (!drag) return;
      vy = (e.clientX - lx) * .4; vx = -(e.clientY - ly) * .4; lx = e.clientX; ly = e.clientY;
      ry += vy; rx += vx;
    });
    const end = () => { drag = false; if (!reduce && Math.abs(vy) < .2) vy = .35; };
    scene.addEventListener('pointerup', end); scene.addEventListener('pointercancel', end);
    const spin = () => {
      if (!drag) { ry += vy; rx += vx; vy += ((reduce ? 0 : .35) - vy) * .02; vx *= .95; }
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      requestAnimationFrame(spin);
    };
    spin();
  }

  /* ---------- timeline reveal in depth ---------- */
  const items = $$('.t-item');
  if (items.length) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .2 });
    items.forEach(i => io.observe(i));
  }

  /* ---------- projects ---------- */
  const grid = $('#projectGrid');
  if (grid) {
    const L = window.KIND_LABEL;
    grid.innerHTML = window.PROJECTS.map(p =>
      `<article class="card proj tilt" data-kind="${p.kind}">
         <span class="kind ${p.kind}">${L[p.kind]}</span><h3>${p.title}</h3><p>${p.text}</p>
         <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div></article>`).join('');
    initTilt(grid);
    $$('.filters button').forEach(b => b.addEventListener('click', () => {
      $$('.filters button').forEach(x => x.classList.remove('on')); b.classList.add('on');
      const k = b.dataset.filter;
      $$('.proj', grid).forEach(c => c.classList.toggle('hide', k !== 'all' && c.dataset.kind !== k));
    }));
    const count = $('#projCount'); if (count) count.textContent = window.PROJECTS.length;
  }

  /* ---------- students ---------- */
  const sg = $('#studentGrid');
  if (sg) {
    sg.innerHTML = window.STUDENTS.map(s =>
      `<article class="card stu tilt">${s.photo ? `<button class="avatar student-photo-trigger" type="button" aria-label="View ${s.name}'s photo"><img src="${s.photo}" alt="${s.name}"></button>` : `<div class="avatar">${s.name.trim().charAt(0).toUpperCase()}</div>`}
       <div class="course">${s.course}</div><h4>${s.name}</h4><p>${s.note}</p></article>`).join('');
    initTilt(sg);

    const photoDialog = $('#studentPhotoDialog');
    const largePhoto = $('#studentPhotoLarge', photoDialog);
    sg.addEventListener('click', e => {
      const trigger = e.target.closest('.student-photo-trigger');
      if (!trigger) return;
      const photo = $('img', trigger);
      largePhoto.src = photo.src;
      largePhoto.alt = photo.alt;
      photoDialog.showModal();
    });
    photoDialog.addEventListener('click', e => {
      if (e.target === photoDialog || e.target.closest('.student-photo-close')) photoDialog.close();
    });
    photoDialog.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        photoDialog.close();
      }
    });
  }

  /* ---------- contact form -> opens mail app ---------- */
  const form = $('#contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const body = `${d.get('message')}\n\nFrom: ${d.get('name')} (${d.get('email')})`;
    location.href = `mailto:${P.email}?subject=${encodeURIComponent(d.get('subject') || 'Hello from your portfolio')}&body=${encodeURIComponent(body)}`;
  });

  initTilt(document);
})();
