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
