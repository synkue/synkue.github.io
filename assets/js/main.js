/* =====================================================================
 * 星鹊软件工作室 Synkue Studio · 主交互脚本
 * 功能模块：
 *   1. 导航栏滚动毛玻璃 + 当前 section 高亮
 *   2. 移动端汉堡菜单
 *   3. 暗黑模式切换（持久化）
 *   4. 入场滚动动画（IntersectionObserver）
 *   5. 回到顶部按钮
 *   6. 联系表单提交（前端校验 + 跳转邮件 / 可改后端）
 *   7. Hero 粒子背景（轻量 Canvas，自适应主题）
 * 修改建议：所有功能模块均已注释，可按需开启 / 关闭
 * ===================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------------------
   * 工具函数
   * ----------------------------------------------------------------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const docEl = document.documentElement;

  /* -------------------------------------------------------------------
   * 1. 导航栏：滚动毛玻璃 + 当前 section 高亮
   * ----------------------------------------------------------------- */
  const navbar = $('#navbar');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  const onScroll = () => {
    // 毛玻璃悬浮
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 当前章节高亮
    const scrollPos = window.scrollY + 120;
    let currentId = 'home';
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });

    // 回到顶部
    if (window.scrollY > 480) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* -------------------------------------------------------------------
   * 2. 移动端汉堡菜单
   * ----------------------------------------------------------------- */
  const menuToggle = $('#menu-toggle');
  const mobileMenu = $('#mobile-menu');
  const mobileLinks = $$('.mobile-link');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // 点击移动端菜单链接后自动关闭
  mobileLinks.forEach((l) => {
    l.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });

  // 窗口尺寸变大时自动收起
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) mobileMenu.classList.add('hidden');
  });

  /* -------------------------------------------------------------------
   * 3. 暗黑模式切换
   * ----------------------------------------------------------------- */
  const themeToggle = $('#theme-toggle');
  const iconLight = $('.theme-icon-light', themeToggle);
  const iconDark = $('.theme-icon-dark', themeToggle);

  const syncThemeIcon = () => {
    const isDark = docEl.classList.contains('dark');
    iconLight.classList.toggle('hidden', isDark);
    iconDark.classList.toggle('hidden', !isDark);
  };
  syncThemeIcon();

  themeToggle.addEventListener('click', () => {
    const willBeDark = !docEl.classList.contains('dark');
    docEl.classList.toggle('dark', willBeDark);
    localStorage.setItem('synkue-theme', willBeDark ? 'dark' : 'light');
    syncThemeIcon();
    // 主题切换时刷新粒子颜色
    if (window._synkueParticles) window._synkueParticles.refreshColor();
  });

  /* -------------------------------------------------------------------
   * 4. 滚动入场动画（IntersectionObserver）
   * ----------------------------------------------------------------- */
  const observed = $$('[data-animate]');
  if ('IntersectionObserver' in window && observed.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            // 同一行内元素错峰入场
            entry.target.style.transitionDelay = (idx % 6) * 60 + 'ms';
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observed.forEach((el) => io.observe(el));
  } else {
    // 回退：直接显示
    observed.forEach((el) => el.classList.add('in-view'));
  }

  /* -------------------------------------------------------------------
   * 5. 回到顶部按钮
   * ----------------------------------------------------------------- */
  const backToTop = $('#back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------------------------------------
   * 6. 联系表单提交
   * ----------------------------------------------------------------- *
   * 默认行为：前端校验后唤起本机邮件客户端发送到 yuxink@126.com
   * 替换为后端 API：在 submitToBackend() 中改为 fetch('/api/lead', ...)
   * ----------------------------------------------------------------- */
  const form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !data.contact || !data.message) {
        showToast('请完整填写姓名、联系方式与需求描述');
        return;
      }

      // —— 默认：唤起邮件客户端 ——
      const subject = encodeURIComponent('[Synkue 官网咨询] ' + (data.type || '需求咨询'));
      const body = encodeURIComponent(
        `姓名：${data.name}\n` +
        `联系方式：${data.contact}\n` +
        `项目类型：${data.type || '未填写'}\n\n` +
        `需求描述：\n${data.message}\n\n` +
        `（来自 Synkue Studio 官网在线表单）`
      );
      window.location.href = `mailto:yuxink@126.com?subject=${subject}&body=${body}`;

      showToast('已为您打开邮件客户端，发送即可与我们联系 ✨', 'success');
      form.reset();

      // —— 如需改为后端 API，可启用下面这段并注释上面的 mailto ——
      // submitToBackend(data);
    });
  }

  // 占位：接入自有后端时使用
  // function submitToBackend(data) {
  //   fetch('/api/lead', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   })
  //   .then(r => r.json())
  //   .then(() => showToast('已提交，我们会尽快联系您 ✨', 'success'))
  //   .catch(() => showToast('提交失败，请稍后重试或直接微信联系'));
  // }

  /* -------------------------------------------------------------------
   * 轻量 Toast 提示
   * ----------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(msg, type) {
    let toast = $('#synkue-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'synkue-toast';
      toast.style.cssText = `
        position: fixed; left: 50%; top: 32px;
        transform: translateX(-50%) translateY(-20px);
        padding: 12px 22px; border-radius: 12px;
        background: rgba(15, 32, 56, .94);
        color: #fff; font-size: 14px; font-weight: 500;
        box-shadow: 0 12px 36px -12px rgba(0,0,0,.3);
        opacity: 0; transition: all .35s ease;
        z-index: 9999; pointer-events: none;
        backdrop-filter: blur(10px);
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.background = type === 'success'
      ? 'linear-gradient(135deg,#337ecc,#409EFF)'
      : 'rgba(15, 32, 56, .94)';
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
    }, 3200);
  }

  /* -------------------------------------------------------------------
   * 7. Hero 轻量粒子背景（< 60 行，无依赖）
   * ----------------------------------------------------------------- */
  const canvas = $('#particles');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let dpr, w, h, particles = [], rafId = null;

    const PARTICLE_COUNT = window.innerWidth < 768 ? 28 : 56;
    const LINK_DIST = window.innerWidth < 768 ? 90 : 140;

    function getColor() {
      return docEl.classList.contains('dark')
        ? 'rgba(121, 187, 255, '   // 暗黑：浅蓝 #79bbff
        : 'rgba(64, 158, 255, ';    // 浅色：品牌蓝 #409EFF
    }
    let color = getColor();

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    function init() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6,
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);

      // 画连线
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.strokeStyle = color + (0.18 * (1 - d / LINK_DIST)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 画点
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = color + '0.55)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    function start() {
      cancelAnimationFrame(rafId);
      resize();
      init();
      tick();
    }

    // 暴露：主题切换时刷新颜色
    window._synkueParticles = {
      refreshColor: () => { color = getColor(); },
    };

    // 用户偏好「减弱动画」时不绘制
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      start();
      window.addEventListener('resize', () => { start(); });
    }
  }

  /* -------------------------------------------------------------------
   * 8. 电子名片：仅展示（打开 / 关闭，纯静态预览，无下载/截图依赖）
   * ----------------------------------------------------------------- */
  const cardModal  = $('#card-modal');
  const openCardBt = $('#open-card');

  if (openCardBt && cardModal) {
    function openCardModal() {
      cardModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeCardModal() {
      cardModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    openCardBt.addEventListener('click', openCardModal);
    cardModal.querySelectorAll('[data-card-close]').forEach((el) => {
      el.addEventListener('click', closeCardModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cardModal.classList.contains('is-open')) closeCardModal();
    });
  }

  /* -------------------------------------------------------------------
   * 初始化首屏滚动状态
   * ----------------------------------------------------------------- */
  onScroll();
})();
