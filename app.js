/*
  Porte's birthday page — quick personalization guide
  ---------------------------------------------------
  Add portraits in /assets using these exact names:
    porte-01.jpg, porte-02.jpg, porte-03.jpg, porte-04.jpg
  The JNV throwbacks, Porte-verse lines, and Rahul's birthday note are below.
*/
const archiveData = {
  classroom: {
    eyebrow: 'THE JNV CHAPTER',
    title: 'THE JNV <span>CHAPTER</span>',
    body: 'We studied together at JNV Korba — the original setting for this particular friendship multiverse. Not every great story needs a cinematic origin.',
    prompt: 'THE BEST PART? We made it out with stories worth keeping and a friendship that made it beyond the school bell.'
  },
  incidents: {
    eyebrow: 'THE FRIENDSHIP LORE',
    title: 'THE LORE <span>IS REAL</span>',
    body: 'Some memories are best explained with “you had to be there.” This little corner is reserved for all the moments that still make school days worth remembering.',
    prompt: 'OFFICIAL BIRTHDAY RULE: today, every story gets retold at least twice — and the best ones get a dramatic soundtrack.'
  },
  legend: {
    eyebrow: 'SEASON TWENTY-TWO',
    title: 'SEASON <span>22</span>',
    body: 'New year unlocked, Porte. More places to go, more things to try, and plenty of chances to make the next chapter a good one.',
    prompt: 'MAY THE NEXT 12 MONTHS BRING GOOD SURPRISES, BIG WINS, GREAT PEOPLE, AND ZERO BORING SIDE QUESTS.'
  }
};

const variantLines = [
  'OG Porte selected. The original edition. The multiverse has no notes.',
  'Party Porte selected. Birthday mode is on. Cake has officially become a priority.',
  'Chaos Porte selected. Plans may change. The vibes, however, must remain excellent.',
  'Porte 22.0 selected. New season, bigger adventures, same legendary name. Update successful.'
];

const birthdayLetter = `Porte, happy 22nd birthday, bro!\n\nFrom JNV Korba days to everything still waiting ahead — here's to bigger adventures, ridiculous laughs, good people, unexpected wins, and stories we'll be telling for years. Have an absolutely brilliant year, bro.\n\n— Rahul`;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const modal = $('#modal');
const modalBody = $('#modalBody');
const modalEyebrow = $('#modalEyebrow');
let toastTimer;

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function openModal(eyebrow, html) {
  modalEyebrow.textContent = eyebrow;
  modalBody.innerHTML = html;
  const modalHeading = $('#modalBody h3');
  if (modalHeading) modalHeading.id = 'modalTitle';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  $('.modal-close').focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

// Opening boot sequence: the supplied birthday song starts here when autoplay is permitted.
$('#launchButton').addEventListener('click', () => {
  $('#bootStatus').textContent = 'SURPRISE OPENED // HAPPY BIRTHDAY';
  $('#bootScreen').classList.add('is-gone');
  document.body.classList.add('launched');
  setTimeout(() => $('#home').scrollIntoView({behavior: 'smooth'}), 180);
  startBackgroundMusic(true);
});

// Mobile navigation.
$('#menuToggle').addEventListener('click', () => {
  const nav = $('.main-nav');
  const isOpen = nav.classList.toggle('open');
  $('#menuToggle').setAttribute('aria-expanded', String(isOpen));
});
$$('.main-nav a').forEach(link => link.addEventListener('click', () => {
  $('.main-nav').classList.remove('open');
  $('#menuToggle').setAttribute('aria-expanded', 'false');
}));

// Reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
$$('.reveal').forEach(el => revealObserver.observe(el));

// Porte's real portraits: use the image path and alt text carried by each thumbnail.
function configurePortraits() {
  const primary = $('.portrait-large');
  if (!primary) return;
  const primaryImg = $('img', primary);
  const thumbs = $$('.portrait-thumb');
  const total = thumbs.length;

  const syncPrimaryState = () => {
    const loaded = primaryImg.complete && primaryImg.naturalWidth > 0;
    const failed = primaryImg.complete && primaryImg.naturalWidth === 0;
    primary.classList.toggle('has-image', loaded);
    primary.classList.toggle('image-error', failed);
  };
  primaryImg.addEventListener('load', () => { primary.classList.add('has-image'); primary.classList.remove('image-error'); });
  primaryImg.addEventListener('error', () => { primary.classList.remove('has-image'); primary.classList.add('image-error'); });
  syncPrimaryState();

  thumbs.forEach((thumb, index) => {
    const img = $('img', thumb);
    const syncThumbState = () => {
      const loaded = img.complete && img.naturalWidth > 0;
      const failed = img.complete && img.naturalWidth === 0;
      thumb.classList.toggle('has-image', loaded);
      thumb.classList.toggle('image-error', failed);
    };
    img.addEventListener('load', () => { thumb.classList.add('has-image'); thumb.classList.remove('image-error'); });
    img.addEventListener('error', () => { thumb.classList.remove('has-image'); thumb.classList.add('image-error'); });
    syncThumbState();

    thumb.addEventListener('click', () => {
      thumbs.forEach(item => item.classList.remove('active'));
      thumb.classList.add('active');
      primary.classList.remove('has-image');
      primaryImg.src = thumb.dataset.src || img.currentSrc || img.src;
      primaryImg.alt = thumb.dataset.alt || 'Netram Porte portrait';

      const number = String(index + 1).padStart(2, '0');
      const count = String(total).padStart(2, '0');
      const indexLabel = $('.portrait-index');
      const countLabel = $('.portrait-glass-label b');
      const caption = $('.portrait-caption span:first-child');
      if (indexLabel) indexLabel.textContent = `PORTE · ${number} / ${count}`;
      if (countLabel) countLabel.textContent = `✦ ${number} / ${count}`;
      if (caption && thumb.dataset.caption) caption.textContent = thumb.dataset.caption;

      syncPrimaryState();
    });
  });
}
configurePortraits();

// Graceful local-image diagnostics for the hero portal and JNV throwback photo.
$$('.hero-portrait-img, .archive-memory-photo img').forEach(img => {
  const holder = img.closest('.birthday-portal, .archive-memory-photo');
  const markLoaded = () => holder?.classList.remove('image-error');
  const markFailed = () => holder?.classList.add('image-error');
  img.addEventListener('load', markLoaded);
  img.addEventListener('error', markFailed);
  if (img.complete) (img.naturalWidth > 0 ? markLoaded : markFailed)();
});

// JNV throwback cards open their birthday-note popups.
$$('.archive-card').forEach(card => card.addEventListener('click', () => {
  const data = archiveData[card.dataset.archive];
  if (!data) return;
  openModal(data.eyebrow, `
    <p class="modal-meta">A LITTLE THROWBACK FROM JNV KORBA</p>
    <h3>${data.title}</h3>
    <p>${data.body}</p>
    <div class="archive-placeholder">${data.prompt}</div>
    <div class="modal-actions"><button class="text-button" data-copy-archive="${card.dataset.archive}">COPY THIS THROWBACK</button><button class="text-button" data-close-modal>CLOSE ×</button></div>
  `);

}));

// Multiverse variants.
$$('.variant-card').forEach(card => card.addEventListener('click', () => {
  $$('.variant-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  const line = variantLines[Number(card.dataset.variant)];
  $('#variantOutput').innerHTML = `<span class="output-pulse"></span><span>${line}</span>`;

}));

// The personal birthday message is now the final reveal after the cake wish.

// Modal close behavior, including dynamically-created close buttons.
document.addEventListener('click', event => {
  if (event.target.matches('[data-close-modal]')) closeModal();
  const copyButton = event.target.closest('[data-copy-archive]');
  if (copyButton) {
    const item = archiveData[copyButton.dataset.copyArchive];
    const content = `${item.title.replace(/<[^>]+>/g, '')}\n${item.body}\n\n${item.prompt}`;
    navigator.clipboard?.writeText(content).then(() => showToast('NOTE COPIED')).catch(() => showToast('COPY NOT AVAILABLE'));
  }
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

// Background song + custom birthday sound design.
// Audible autoplay is attempted on page load. Browsers may block it until a gesture;
// the gift-opening click (or the first page interaction) then starts the song.
const birthdayMusic = $('#birthdayMusic');
let soundEnabled = false;
let userMutedSound = false;
let audioContext = null;
let noiseBuffer = null;

function updateSoundToggle(label) {
  const toggle = $('#soundToggle');
  toggle.setAttribute('aria-pressed', String(soundEnabled));
  $('#soundLabel').textContent = label || (soundEnabled ? 'MUSIC ON' : (userMutedSound ? 'MUSIC OFF' : 'ENABLE MUSIC'));
  toggle.title = soundEnabled ? 'Turn background music and sound effects off' : 'Turn background music and sound effects on';
}

function startBackgroundMusic(fromUserGesture = false) {
  if (!birthdayMusic || userMutedSound) return;
  if (fromUserGesture) {
    soundEnabled = true;
    updateSoundToggle('MUSIC ON');
  }
  birthdayMusic.volume = 0.26;
  const attempt = birthdayMusic.play();
  if (attempt && typeof attempt.then === 'function') {
    attempt.then(() => {
      if (userMutedSound) { birthdayMusic.pause(); return; }
      soundEnabled = true;
      updateSoundToggle('MUSIC ON');
    }).catch(() => {
      if (userMutedSound) return;
      soundEnabled = false;
      updateSoundToggle('TAP FOR MUSIC');
    });
  } else {
    soundEnabled = true;
    updateSoundToggle('MUSIC ON');
  }
}

function stopBackgroundMusic() {
  if (!birthdayMusic) return;
  birthdayMusic.pause();
  soundEnabled = false;
  updateSoundToggle('MUSIC OFF');
}

function getAudioContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioContext) audioContext = new AudioCtx();
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}

function getNoiseBuffer(ctx, duration = 1) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
  if (!noiseBuffer || noiseBuffer.length < length) {
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) channel[i] = (Math.random() * 2 - 1) * (0.72 + Math.random() * 0.28);
    noiseBuffer = buffer;
  }
  return noiseBuffer;
}

function playTone(frequency, duration = 0.12, options = {}) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const startAt = ctx.currentTime + (options.delay || 0);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = options.wave || 'sine';
  osc.frequency.setValueAtTime(Math.max(30, frequency), startAt);
  if (options.endFrequency) osc.frequency.exponentialRampToValueAtTime(Math.max(30, options.endFrequency), startAt + duration);
  if (options.detune) osc.detune.setValueAtTime(options.detune, startAt);
  const peak = options.volume ?? 0.045;
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(peak, startAt + Math.min(0.014, duration * 0.2));
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.025);
}

function playNoiseSweep(duration = 0.35, options = {}) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const startAt = ctx.currentTime + (options.delay || 0);
  const source = ctx.createBufferSource();
  source.buffer = getNoiseBuffer(ctx, duration);
  const filter = ctx.createBiquadFilter();
  filter.type = options.filter || 'lowpass';
  filter.Q.value = options.q || 0.7;
  filter.frequency.setValueAtTime(options.from || 2400, startAt);
  filter.frequency.exponentialRampToValueAtTime(Math.max(80, options.to || 350), startAt + duration);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(options.volume || 0.075, startAt + Math.min(0.035, duration * 0.18));
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(startAt);
  source.stop(startAt + duration + 0.025);
}


function playCinematicBoom() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-18, now);
  compressor.knee.setValueAtTime(18, now);
  compressor.ratio.setValueAtTime(7, now);
  compressor.attack.setValueAtTime(0.004, now);
  compressor.release.setValueAtTime(0.65, now);
  compressor.connect(ctx.destination);

  // Deep sub impact: pitch falls quickly, then leaves a low cinematic tail.
  const sub = ctx.createOscillator();
  const subGain = ctx.createGain();
  sub.type = 'sine';
  sub.frequency.setValueAtTime(118, now);
  sub.frequency.exponentialRampToValueAtTime(34, now + 1.45);
  subGain.gain.setValueAtTime(0.0001, now);
  subGain.gain.exponentialRampToValueAtTime(0.48, now + 0.025);
  subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);
  sub.connect(subGain); subGain.connect(compressor);
  sub.start(now); sub.stop(now + 1.75);

  // A short, weighty second hit adds the physical "boom" without clipping.
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.type = 'triangle';
  thump.frequency.setValueAtTime(76, now + 0.035);
  thump.frequency.exponentialRampToValueAtTime(39, now + 0.62);
  thumpGain.gain.setValueAtTime(0.0001, now + 0.035);
  thumpGain.gain.exponentialRampToValueAtTime(0.23, now + 0.055);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
  thump.connect(thumpGain); thumpGain.connect(compressor);
  thump.start(now + 0.035); thump.stop(now + 0.75);

  // Filtered broadband impact creates the cinematic crack and rolling tail.
  const noise = ctx.createBufferSource();
  const lowPass = ctx.createBiquadFilter();
  const noiseGain = ctx.createGain();
  noise.buffer = getNoiseBuffer(ctx, 1.65);
  lowPass.type = 'lowpass';
  lowPass.frequency.setValueAtTime(2600, now);
  lowPass.frequency.exponentialRampToValueAtTime(115, now + 1.35);
  lowPass.Q.value = 0.75;
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.24, now + 0.018);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.55);
  noise.connect(lowPass); lowPass.connect(noiseGain); noiseGain.connect(compressor);
  noise.start(now); noise.stop(now + 1.62);

  // A bright, quick snap sits on top of the low impact.
  const crack = ctx.createBufferSource();
  const highPass = ctx.createBiquadFilter();
  const crackGain = ctx.createGain();
  crack.buffer = getNoiseBuffer(ctx, 0.28);
  highPass.type = 'highpass';
  highPass.frequency.setValueAtTime(1800, now);
  highPass.frequency.exponentialRampToValueAtTime(480, now + 0.22);
  crackGain.gain.setValueAtTime(0.0001, now);
  crackGain.gain.exponentialRampToValueAtTime(0.10, now + 0.006);
  crackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
  crack.connect(highPass); highPass.connect(crackGain); crackGain.connect(compressor);
  crack.start(now); crack.stop(now + 0.27);
}

function playSfx(type = 'tap') {
  if (!soundEnabled) return;
  switch (type) {
    case 'tap':
      playTone(780, 0.045, {wave: 'triangle', volume: 0.022, endFrequency: 620});
      break;
    case 'open':
      playNoiseSweep(0.48, {from: 2100, to: 180, volume: 0.075});
      playTone(523.25, 0.22, {delay: 0.10, volume: 0.035});
      playTone(783.99, 0.28, {delay: 0.20, volume: 0.028});
      break;
    case 'popup':
    case 'letter':
      playNoiseSweep(0.20, {from: 1500, to: 520, volume: 0.035});
      playTone(type === 'letter' ? 740 : 620, 0.13, {delay: 0.05, wave: 'sine', volume: 0.035});
      playTone(type === 'letter' ? 988 : 830, 0.18, {delay: 0.14, volume: 0.025});
      break;
    case 'photo':
      playTone(560, 0.075, {wave: 'triangle', volume: 0.025});
      playTone(840, 0.12, {delay: 0.055, volume: 0.022});
      break;
    case 'select':
      playTone(490, 0.09, {wave: 'triangle', volume: 0.03});
      playTone(735, 0.15, {delay: 0.075, volume: 0.034});
      break;
    case 'scan':
      playNoiseSweep(0.38, {from: 480, to: 4200, filter: 'highpass', volume: 0.045});
      playTone(440, 0.28, {delay: 0.02, endFrequency: 1180, volume: 0.028});
      break;
    case 'candle':
      // A short airy puff followed by a tiny extinguish pop.
      playNoiseSweep(0.30, {from: 3900, to: 520, filter: 'highpass', volume: 0.095});
      playTone(210, 0.12, {delay: 0.10, endFrequency: 95, wave: 'sine', volume: 0.025});
      break;
    case 'blow':
      // Fuller breath-like whoosh for the all-candles action.
      playNoiseSweep(0.82, {from: 3000, to: 240, filter: 'lowpass', volume: 0.11});
      playNoiseSweep(0.62, {from: 1800, to: 320, filter: 'highpass', delay: 0.04, volume: 0.045});
      playTone(150, 0.55, {endFrequency: 62, wave: 'sine', volume: 0.025});
      break;
    case 'relight':
      playTone(392, 0.16, {volume: 0.028});
      playTone(587.33, 0.18, {delay: 0.08, volume: 0.032});
      playTone(880, 0.22, {delay: 0.17, volume: 0.035});
      break;
    case 'celebrate':
      playNoiseSweep(0.8, {from: 900, to: 4800, filter: 'highpass', volume: 0.06});
      playTone(659.25, 0.18, {volume: 0.035});
      playTone(830.61, 0.18, {delay: 0.11, volume: 0.035});
      playTone(987.77, 0.24, {delay: 0.22, volume: 0.04});
      break;
    case 'toggle-on':
      playTone(660, 0.1, {wave: 'triangle', volume: 0.03});
      playTone(990, 0.14, {delay: 0.08, volume: 0.03});
      break;
    case 'toggle-off':
      playTone(520, 0.12, {wave: 'triangle', volume: 0.022, endFrequency: 340});
      break;
  }
}

$('#soundToggle').addEventListener('click', () => {
  if (soundEnabled) {
    playSfx('toggle-off');
    userMutedSound = true;
    stopBackgroundMusic();
  } else {
    userMutedSound = false;
    soundEnabled = true;
    updateSoundToggle('MUSIC ON');
    startBackgroundMusic(true);
    playSfx('toggle-on');
  }
});

// If autoplay is blocked, start the song on the first genuine visitor interaction.
// Skip the sound-toggle itself so its click can intentionally turn audio on.
document.addEventListener('pointerdown', event => {
  if (userMutedSound || soundEnabled || event.target.closest('#soundToggle')) return;
  startBackgroundMusic(true);
}, {capture: true});
document.addEventListener('keydown', event => {
  if (userMutedSound || soundEnabled || event.target.closest('#soundToggle') || !['Enter', ' '].includes(event.key)) return;
  startBackgroundMusic(true);
}, {capture: true});

// Try audible autoplay as soon as the page is ready. If rejected, the invitation
// and top-bar sound control remain ready to start it after a tap/click.
startBackgroundMusic();

// Gentle default feedback for all other actionable buttons and in-page links.
document.addEventListener('click', event => {
  const control = event.target.closest('button, a[href^="#"]');
  if (!control || control.disabled || control.id === 'soundToggle' || control.id === 'makeWishButton') return;
  playSfx(control.dataset.sfx || 'tap');
});

const scanButton = $('#scanButton');
if (scanButton) scanButton.addEventListener('click', () => {
  const visual = $('.hero-visual');
  visual.animate([{filter:'brightness(1)'},{filter:'brightness(1.9) saturate(1.7)'},{filter:'brightness(1)'}], {duration:850, easing:'ease-out'});
  showToast('CONFIRMED: IT IS INDEED PORTE');

});

// Canvas confetti finale.
const canvas = $('#confettiCanvas');
const ctx2d = canvas.getContext('2d');
let confetti = [];
let confettiFrame = null;
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(rect.width * dpr); canvas.height = Math.floor(rect.height * dpr);
  ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas(); window.addEventListener('resize', resizeCanvas);
function launchConfetti() {
  resizeCanvas();
  const rect = canvas.getBoundingClientRect();
  const colors = ['#176b9a','#2897c7','#5bd8f4','#f5fcff','#77b7d3','#123f5d'];
  confetti = Array.from({length:190}, () => ({
    x: Math.random()*rect.width, y: -20-Math.random()*rect.height*.7,
    vx: (Math.random()-.5)*4, vy: 2+Math.random()*4,
    size: 3+Math.random()*5, rot: Math.random()*Math.PI,
    spin: (Math.random()-.5)*.18, color: colors[Math.floor(Math.random()*colors.length)],
    shape: Math.random()>.75?'circle':'rect', life: 0
  }));
  if (confettiFrame) cancelAnimationFrame(confettiFrame);
  const draw = () => {
    ctx2d.clearRect(0,0,rect.width,rect.height);
    confetti.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += .035; p.rot += p.spin; p.life++;
      ctx2d.save(); ctx2d.translate(p.x,p.y); ctx2d.rotate(p.rot); ctx2d.fillStyle=p.color;
      if(p.shape==='circle'){ctx2d.beginPath();ctx2d.arc(0,0,p.size/2,0,Math.PI*2);ctx2d.fill();}
      else ctx2d.fillRect(-p.size/2,-p.size/2,p.size,p.size*.65);
      ctx2d.restore();
    });
    confetti = confetti.filter(p => p.y < rect.height+30 && p.life < 280);
    if(confetti.length) confettiFrame=requestAnimationFrame(draw); else ctx2d.clearRect(0,0,rect.width,rect.height);
  };
  draw();
}
// Interactive birthday cake: each candle can be tapped, or all can be blown out together.
const candleButtons = $$('.candle');
const candleCount = $('#candleCount');
const candleProgressBar = $('#candleProgressBar');
const cakeInstruction = $('#cakeInstruction');
const wishReveal = $('#wishReveal');
const wishPrompt = $('#wishPrompt');
const birthdayEndCard = $('#birthdayEndCard');
let birthdayComplete = false;
let wishMade = false;
let blowTimers = [];

function playBirthdayChime() {
  if (!soundEnabled) return;
  playTone(659.25, 0.22, {volume: 0.045});
  playTone(783.99, 0.22, {delay: 0.14, volume: 0.045});
  playTone(987.77, 0.25, {delay: 0.28, volume: 0.05});
  playTone(1318.51, 0.34, {delay: 0.44, volume: 0.052});
  playTone(1567.98, 0.40, {delay: 0.64, volume: 0.035});
}

function updateCakeProgress() {
  const remaining = candleButtons.filter(candle => !candle.classList.contains('is-out')).length;
  candleCount.textContent = String(remaining);
  candleProgressBar.style.width = `${(remaining / candleButtons.length) * 100}%`;
  if (remaining === 0 && !birthdayComplete) {
    birthdayComplete = true;
    blowTimers.forEach(clearTimeout);
    blowTimers = [];
    cakeInstruction.innerHTML = '<span class="instruction-icon">✦</span><span>ALL FLAMES OUT — TAKE A MOMENT AND MAKE YOUR WISH.</span>';
    $('#blowAllButton').disabled = true;
    $('.cake-stage').classList.add('wish-ready');
    wishReveal.classList.add('is-visible');
    playBirthdayChime();
  }
}

function revealBirthdayWish() {
  if (!birthdayComplete || wishMade) return;
  wishMade = true;
  const blast = $('#wishBlastOverlay');
  document.body.classList.add('wish-impact');
  blast.classList.add('active');
  if (birthdayMusic && !birthdayMusic.paused) {
    birthdayMusic.volume = 0.10;
    setTimeout(() => { if (!userMutedSound && !birthdayMusic.paused) birthdayMusic.volume = 0.26; }, 1700);
  }
  playCinematicBoom();
  wishPrompt.classList.add('is-dismissed');
  setTimeout(() => {
    wishPrompt.hidden = true;
    birthdayEndCard.classList.add('is-visible');
    birthdayEndCard.setAttribute('aria-hidden', 'false');
    setTimeout(() => birthdayEndCard.scrollIntoView({behavior: 'smooth', block: 'center'}), 680);
    launchConfetti();
    setTimeout(launchConfetti, 620);
  }, 430);
  setTimeout(() => {
    document.body.classList.remove('wish-impact');
    blast.classList.remove('active');
  }, 1450);
}

function extinguishCandle(candle) {
  if (!candle || candle.classList.contains('is-out')) return;
  candle.classList.add('is-out');
  candle.disabled = true;
  candle.setAttribute('aria-label', `Candle ${candle.dataset.candle} is blown out`);
  updateCakeProgress();
}

candleButtons.forEach(candle => candle.addEventListener('click', () => extinguishCandle(candle)));

$('#blowAllButton').addEventListener('click', () => {
  if (birthdayComplete) return;
  $('#blowAllButton').disabled = true;
  blowTimers = candleButtons.map((candle, index) =>
    setTimeout(() => extinguishCandle(candle), index * 115)
  );
});

$('#resetCakeButton').addEventListener('click', () => {
  blowTimers.forEach(clearTimeout);
  blowTimers = [];
  birthdayComplete = false;
  wishMade = false;
  wishPrompt.hidden = false;
  wishPrompt.classList.remove('is-dismissed');
  birthdayEndCard.classList.remove('is-visible');
  birthdayEndCard.setAttribute('aria-hidden', 'true');
  $('#wishBlastOverlay').classList.remove('active');
  $('.cake-stage').classList.remove('wish-ready');
  document.body.classList.remove('wish-impact');
  candleButtons.forEach((candle, index) => {
    candle.classList.remove('is-out');
    candle.disabled = false;
    candle.setAttribute('aria-label', `Blow out candle ${index + 1}`);
  });
  wishReveal.classList.remove('is-visible');
  $('#blowAllButton').disabled = false;
  cakeInstruction.innerHTML = '<span class="instruction-icon">☝</span><span>MAKE A WISH — TAP EACH CANDLE FLAME TO BLOW IT OUT</span>';
  updateCakeProgress();
  showToast('CANDLES RELIT — MAKE ANOTHER WISH!');
});

$('#makeWishButton').addEventListener('click', revealBirthdayWish);
$('#replayWishButton').addEventListener('click', () => {
  $('#resetCakeButton').click();
  $('.cake-stage').scrollIntoView({behavior: 'smooth', block: 'center'});
});
$('#copyBirthdayNote').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(birthdayLetter);
    showToast('BIRTHDAY WISH COPIED');
  } catch {
    showToast('COPY IS NOT AVAILABLE IN THIS BROWSER');
  }
});
