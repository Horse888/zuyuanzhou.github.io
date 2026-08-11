const dataset = {
  whoami: {
    title: '$ whoami',
    blocks: [
      {
        title: 'ZY',
        desc: 'iOS + Flutter 开发者。长期做应用交付、架构、产品体验迭代。',
        meta: 'Focus: 体验稳定性、性能、工程效率',
      },
    ],
  },
  projects: {
    title: '$ ls /projects',
    blocks: [
      {
        title: 'Painless (PainlessFlutter)',
        desc: 'Flutter 生态下的业务产品，持续在体验和稳定性上做精细优化。',
        meta: 'Stack: Flutter, Dart, RESTful APIs',
      },
      {
        title: 'SuperClockNew',
        desc: '原生时钟类应用，强化表盘渲染性能和交互细节。',
        meta: 'Stack: Swift, SwiftUI, Watch / iOS Runtime',
      },
      {
        title: 'LYMUniversal / LYMCommon',
        desc: '跨产品复用组件与公共模块，提升后续项目的开发速度和质量一致性。',
        meta: 'Stack: iOS + Flutter, 通用组件化',
      },
      {
        title: '个人主页（本项目）',
        desc: '把过往项目改造成以“技术履历 + 作品集”聚焦的现代化表达。',
        meta: 'Stack: HTML, CSS, JavaScript',
      },
    ],
  },
  experience: {
    title: '$ cat /timeline',
    blocks: [
      {
        title: '产品到工程的闭环',
        desc: '从页面和组件实现，到本地化、发布、维护，形成完整交付链路。',
        meta: '2024 - 2026',
      },
      {
        title: '高质量重构',
        desc: '持续用更轻量的结构替换陈旧实现，优化可维护性和上线稳定性。',
        meta: '长期',
      },
      {
        title: '平台化思维',
        desc: '偏爱可复用模块和一致化开发习惯，减少重复构建成本。',
        meta: '持续迭代',
      },
    ],
  },
  stack: {
    title: '$ cat /stack',
    blocks: [
      {
        title: 'Mobile',
        desc: 'iOS、Flutter、Native 与跨平台体验调优。',
        meta: 'Swift, SwiftUI, Flutter',
      },
      {
        title: 'Frontend',
        desc: '简洁可靠的前端页面与交互实现。',
        meta: 'HTML, CSS, TypeScript, React/Vue（按项目选型）',
      },
      {
        title: 'Ops',
        desc: '版本交付、问题定位、回归验证。',
        meta: 'GitHub Pages, CI 思维, 日志/线上复现',
      },
    ],
  },
  contact: {
    title: '$ cat /contact',
    blocks: [
      {
        title: '邮箱',
        desc: '可直接使用邮件联系，沟通合作或技术讨论。',
        meta: 'mailto: youremail@example.com',
      },
      {
        title: 'GitHub',
        desc: '更多项目源代码与迭代日志，欢迎关注与协作。',
        meta: 'github.com/Horse888',
      },
      {
        title: '领域方向',
        desc: 'iOS、Flutter、个人效率型工具与应用工程化建设。',
        meta: '长期开放协作与咨询',
      },
    ],
  },
};

const output = document.getElementById('output');
const streamTitle = document.getElementById('streamTitle');
const streamContent = document.getElementById('streamContent');
const commandButtons = Array.from(document.querySelectorAll('#commandList button'));

function render(cmd) {
  const data = dataset[cmd];
  if (!data) return;

  output.textContent = '';
  const line = `${new Date().toLocaleTimeString()}  -> running ${cmd}`;
  output.textContent = `${line}\n`;

  streamTitle.textContent = data.title;
  streamContent.innerHTML = '';

  data.blocks.forEach((item, idx) => {
    const c = document.createElement('article');
    c.className = 'card';
    c.style.animation = `fadeIn 0.3s ease ${idx * 0.12}s both`;
    c.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p><div class="meta">${item.meta}</div>`;
    streamContent.appendChild(c);

    output.textContent += `> ${item.title}\n  ${item.desc}\n`;
  });
}

function setActive(cmd) {
  commandButtons.forEach((btn) => {
    btn.style.background = '#0a1b35';
    if (btn.dataset.cmd === cmd) {
      btn.style.borderColor = '#5ee7b9';
      btn.style.color = '#ffffff';
    } else {
      btn.style.borderColor = 'rgba(255, 255, 255, 0.16)';
    }
  });
}

commandButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const cmd = btn.dataset.cmd;
    render(cmd);
    setActive(cmd);
  });
});

let idx = 0;
const cycle = ['whoami', 'projects', 'experience', 'stack', 'contact'];
function autoPlay() {
  const cmd = cycle[idx % cycle.length];
  idx += 1;
  render(cmd);
  setActive(cmd);
  const targetButton = document.querySelector(`[data-cmd="${cmd}"]`);
  if (targetButton) {
    targetButton.focus({ preventScroll: true });
  }
}

const particleCanvas = document.getElementById('particleCanvas');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let shouldReduceMotion = reduceMotion.matches;

if (particleCanvas instanceof HTMLCanvasElement) {
  const canvas = particleCanvas;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const particles = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pointer = {
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
    };

    const random = (min, max) => Math.random() * (max - min) + min;
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnParticle = (x, y, baseAngle, baseSpeed) => {
      const speed = clamp(baseSpeed * random(0.4, 1.2), 0.4, 4.8);
      const angle = baseAngle + random(-0.65, 0.65);
      particles.push({
        x,
        y,
        px: x,
        py: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        hue: random(170, 290),
        size: random(1.2, 3.6),
        life: random(34, 86),
        lifeMax: 0,
      });
      const last = particles[particles.length - 1];
      last.lifeMax = last.life;
    };

    const emitTrail = () => {
      const speed = Math.hypot(pointer.vx, pointer.vy);
      const count = Math.min(Math.max(Math.floor(speed * 0.25), 1), 10);
      const angle = Math.atan2(pointer.vy, pointer.vx) + Math.PI;
      const scaledSpeed = clamp(speed * 0.12 + 0.35, 0.25, 2.4);
      for (let i = 0; i < count; i += 1) {
        if (particles.length > 900) particles.shift();
        spawnParticle(pointer.x, pointer.y, angle, scaledSpeed);
      }
    };

    const emitBurst = (x, y) => {
      for (let i = 0; i < 48; i += 1) {
        if (particles.length > 900) particles.shift();
        spawnParticle(
          x,
          y,
          random(0, Math.PI * 2),
          random(1.6, 3.6),
        );
      }
    };

    const onMove = (event) => {
      if (shouldReduceMotion) return;
      const nextX = event.clientX;
      const nextY = event.clientY;
      pointer.vx = nextX - pointer.x;
      pointer.vy = nextY - pointer.y;
      pointer.x = nextX;
      pointer.y = nextY;
      emitTrail();
    };

    const onDown = (event) => {
      if (shouldReduceMotion) return;
      emitBurst(event.clientX, event.clientY);
    };

    const onVisibility = () => {
      if (document.hidden) {
        particles.length = 0;
      }
    };

    const tick = () => {
      requestAnimationFrame(tick);
      if (shouldReduceMotion) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.px = particle.x;
        particle.py = particle.y;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.size *= 0.995;
        particle.life -= 1;

        const alpha = particle.life / particle.lifeMax;
        if (alpha <= 0.02 || particle.size < 0.25) {
          particles.splice(i, 1);
          continue;
        }

        if (
          particle.x < -40 ||
          particle.y < -40 ||
          particle.x > width + 40 ||
          particle.y > height + 40
        ) {
          particles.splice(i, 1);
          continue;
        }

        const lineColor = `hsla(${particle.hue}, 82%, 66%, ${clamp(alpha, 0, 0.75)})`;
        const dotColor = `hsla(${particle.hue}, 85%, 74%, ${clamp(alpha * 1.1, 0, 0.95)})`;

        ctx.beginPath();
        ctx.lineWidth = Math.max(1, particle.size * 0.5);
        ctx.strokeStyle = lineColor;
        ctx.moveTo(particle.px, particle.py);
        ctx.lineTo(particle.x, particle.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = dotColor;
        ctx.arc(particle.x, particle.y, Math.max(particle.size * 0.5, 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    const onReduce = (event) => {
      shouldReduceMotion = event.matches;
      if (shouldReduceMotion) {
        particles.length = 0;
      }
    };

    resizeCanvas();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', onReduce);

    tick();
  }
}

const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

autoPlay();
setInterval(autoPlay, 9000);
