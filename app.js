/* ==========================================================================
   JOINT AI LABS - FUTURISTIC AI AGENCY WEBSITE CORE ENGINE (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. HIGH-TECH TERMINAL PRELOADER ENGINE
  // --------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-bar');
  const terminal = document.getElementById('preloader-terminal');

  const bootLogs = [
    'CONNECTING TO JOINT AI MATRIX...',
    'CONFIGURING FUTURISTIC BRAND LAYER... OK',
    'CALIBRATING QUANTUM COLOR SYSTEMS (#FF7A00, #39FF14)... DONE',
    'BOOTING HIGH-FPS SWARM ENGINE... READY',
    'COMPILING CONIC SHIFT GRADIENTS... LOADED',
    'MOUNTING ZERO-LATENCY NAVIGATION MATRIX... MOUNTED',
    'INTEGRATING VERCEL SPOTLIGHT HOVER BORDERS... EXECUTING',
    'SYNCHRONIZING GROWTH DASHBOARD KPI VECTORS... SECURED',
    'ALL SYSTEM CORES RUNNING COMPILATION... SUCCESS'
  ];

  let currentLogIdx = 0;
  let preloaderProgress = 0;

  // Print Terminal Boot Logs sequentially
  function printNextLog() {
    if (currentLogIdx < bootLogs.length && terminal) {
      const logDiv = document.createElement('div');
      logDiv.className = 'terminal-log';
      logDiv.textContent = `> ${bootLogs[currentLogIdx]}`;
      terminal.appendChild(logDiv);
      terminal.scrollTop = terminal.scrollHeight;
      currentLogIdx++;
      
      // Snappy and cinematic delays
      setTimeout(printNextLog, 100 + Math.random() * 50);
    }
  }

  // Animate Preloader Bar Countdown
  function updatePreloaderBar() {
    preloaderProgress += 1.5 + Math.random() * 2.0;
    if (preloaderProgress >= 100) {
      preloaderProgress = 100;
      if (progressBar) progressBar.style.width = '100%';
      
      // Curtain Fade Out Transition
      setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
        // Trigger page elements reveals
        animateDashboardMetric();
      }, 300);
    } else {
      if (progressBar) progressBar.style.width = `${preloaderProgress}%`;
      requestAnimationFrame(updatePreloaderBar);
    }
  }

  // Start Preloader
  printNextLog();
  setTimeout(updatePreloaderBar, 150);


  // --------------------------------------------------------------------------
  // 2. HIGH-PERFORMANCE QUANTUM PARTICLE SWARM CANVAS (WITH TOUCH SCREEN MAPPING)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('wave-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    // Mouse & Touch Tracking Coordinates
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    
    // Mouse Listeners
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });

    // Touch Screen Event Mapping (For iPhone / Android dragging)
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    });

    window.addEventListener('touchend', () => {
      // Let the attractor stay at the last touched position for an organic glide feel
    });

    // Swarm Configurations
    const particles = [];
    // Scale count: 110 on desktop, 40 on mobile to guarantee a locked 60fps on phones
    const maxParticles = isMobile ? 40 : 110;

    const colors = [
      'rgba(255, 122, 0, ', // Orange Glow
      'rgba(57, 255, 20, ',  // Green Glow
      'rgba(0, 255, 179, '   // Cyan Glow
    ];

    class SwarmNode {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 15;
        this.baseSize = Math.random() * 1.8 + 0.8;
        this.size = this.baseSize;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = -(Math.random() * 1.0 + 0.3);
        
        const colorSeed = Math.random();
        this.colorIdx = colorSeed < 0.45 ? 0 : colorSeed < 0.85 ? 1 : 2;
        this.baseAlpha = Math.random() * 0.4 + 0.15;
        this.alpha = this.baseAlpha;
        
        this.magnetFactor = Math.random() * 0.015 + 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Core Physics: Attraction pull to mouse/touch coordinates
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attractionDist = isMobile ? 180 : 280; // Limit influence range on mobile

        if (dist < attractionDist) {
          // Attract particles, creating custom swirling orbital streams (Increased 3x for dramatic visual vortex!)
          this.vx += (dx / dist) * (attractionDist - dist) * this.magnetFactor * 0.45;
          this.vy += (dy / dist) * (attractionDist - dist) * this.magnetFactor * 0.45;
          
          this.size = this.baseSize * (1 + (attractionDist - dist) / 100);
          this.alpha = Math.min(0.95, this.baseAlpha * 1.8);
        } else {
          this.size = this.baseSize;
          this.alpha = this.baseAlpha;
          
          // Friction deceleration
          this.vx *= 0.97;
          this.vy *= 0.97;
          this.vx += (Math.random() - 0.5) * 0.06;
          this.vy += (Math.random() - 0.5) * 0.03;
        }

        // Speed boundaries
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = isMobile ? 2.5 : 3.5;
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        // Re-spawn wrap
        if (this.x < -30 || this.x > width + 30 || this.y < -30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${colors[this.colorIdx]}${this.alpha})`;
        
        // Draw glowing vector nodes
        if (this.alpha > 0.45 && !isMobile) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = colors[this.colorIdx] + '0.5)';
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      }
    }

    // Initialize Swarm Nodes
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new SwarmNode());
    }

    // Click/Tap Shockwave Ripples
    let shockwave = { x: 0, y: 0, radius: 0, active: false, maxRadius: isMobile ? 150 : 250 };

    function triggerShockwave(x, y) {
      shockwave.x = x;
      shockwave.y = y;
      shockwave.radius = 0;
      shockwave.active = true;
    }

    window.addEventListener('click', (e) => {
      // Don't trigger if clicked on links or buttons to avoid overlay noise
      if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
        triggerShockwave(e.clientX, e.clientY);
      }
    });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0 && e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
        triggerShockwave(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    function drawShockwave() {
      if (!shockwave.active) return;
      shockwave.radius += isMobile ? 6 : 9;
      if (shockwave.radius > shockwave.maxRadius) {
        shockwave.active = false;
        return;
      }

      ctx.beginPath();
      ctx.arc(shockwave.x, shockwave.y, shockwave.radius, 0, Math.PI * 2);
      ctx.lineWidth = isMobile ? 1.0 : 1.8;
      const opacity = 1 - shockwave.radius / shockwave.maxRadius;
      ctx.strokeStyle = `rgba(0, 255, 179, ${opacity * 0.45})`;
      
      if (!isMobile) {
        ctx.shadowBlur = 18;
        ctx.shadowColor = 'rgba(0, 255, 179, 0.4)';
      }
      
      ctx.stroke();
    }

    // Main Swarm Canvas Animation loop
    function animateSwarm() {
      // Reset shadow blur to prevent glowing colored background bleeding casts
      ctx.shadowBlur = 0;

      // Clear with website's exact pitch-black cobalt color to prevent colored background casts
      ctx.fillStyle = 'rgba(2, 4, 10, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse/touch coordinates interpolation (Accelerated 3x to feel highly responsive & snappy)
      mouse.x += (mouse.targetX - mouse.x) * 0.24;
      mouse.y += (mouse.targetY - mouse.y) * 0.24;

      // Draw background ambient connection threads (Only on Desktop to save mobile CPU)
      if (!isMobile) {
        ctx.shadowBlur = 0;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              const lineAlpha = (1 - dist / 100) * 0.07;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Update & render swarm nodes
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Render shockwave ripple
      drawShockwave();

      requestAnimationFrame(animateSwarm);
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    animateSwarm();
  }


  // --------------------------------------------------------------------------
  // 3. VERCEL-STYLE SPOTLIGHT CARD BORDERS (WITH PHONE TOUCH DRAG SUPPORT)
  // --------------------------------------------------------------------------
  const glassCards = document.querySelectorAll('.glass-card, .service-card, .detail-service-card, .project-card, .blog-card, .timeline-card, .team-card, .neural-panel');
  
  glassCards.forEach((card) => {
    // Mouse hover coordinates tracking
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    // Touch screen dragging coordinates tracking
    card.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = card.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  });


  // --------------------------------------------------------------------------
  // 4. TACTILE 3D CARD PERSPECTIVE TILT (DESKTOP OPTIMIZED)
  // --------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  if (window.innerWidth > 1024) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (-mouseY / (cardHeight / 2)) * 10;
        const rotateY = (mouseX / (cardWidth / 2)) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }


  // --------------------------------------------------------------------------
  // 5. INTERACTIVE MORPHING SVG DASHBOARD CHART (TOUCH & TAP COMPATIBLE)
  // --------------------------------------------------------------------------
  const metricButtons = document.querySelectorAll('.interactive-sub-row');
  const chartPathStroke = document.getElementById('chart-path-stroke');
  const chartPathGlow = document.getElementById('chart-path-glow');
  const chartNodePulse = document.getElementById('chart-node-pulse');
  const chartNodeRing = document.getElementById('chart-node-ring');
  
  const metricVal = document.getElementById('dashboard-users-count');
  const metricLabel = document.getElementById('dashboard-main-label');
  const metricGrowth = document.getElementById('dashboard-main-growth');
  const dashTitle = document.getElementById('dash-title-metric');

  const metricData = {
    users: {
      path: 'M0,80 Q30,60 60,75 T120,40 T180,65 T240,30 T300,15',
      glowPath: 'M0,80 Q30,60 60,75 T120,40 T180,65 T240,30 T300,15 L300,100 L0,100 Z',
      val: '25.6K',
      growth: '+12.5%',
      label: 'Total Users',
      title: 'Users Dashboard',
      nodeX: 240,
      nodeY: 30,
      color: '#39FF14'
    },
    engagement: {
      path: 'M0,90 Q40,35 80,55 T140,25 T200,80 T260,18 T300,5',
      glowPath: 'M0,90 Q40,35 80,55 T140,25 T200,80 T260,18 T300,5 L300,100 L0,100 Z',
      val: '84.3%',
      growth: '+18.2%',
      label: 'Engagement Rate',
      title: 'Engagement Stats',
      nodeX: 260,
      nodeY: 18,
      color: '#FF7A00'
    },
    conversion: {
      path: 'M0,95 Q50,85 100,50 T160,65 T220,35 T280,20 T300,10',
      glowPath: 'M0,95 Q50,85 100,50 T160,65 T220,35 T280,20 T300,10 L300,100 L0,100 Z',
      val: '6.42%',
      growth: '+8.7%',
      label: 'Conversion Factor',
      title: 'Conversion Matrix',
      nodeX: 220,
      nodeY: 35,
      color: '#00FFB3'
    },
    retention: {
      path: 'M0,70 Q60,75 120,40 T180,25 T240,30 T290,10 T300,3',
      glowPath: 'M0,70 Q60,75 120,40 T180,25 T240,30 T290,10 T300,3 L300,100 L0,100 Z',
      val: '92.1%',
      growth: '+14.3%',
      label: 'Retention Index',
      title: 'Retention Dynamics',
      nodeX: 180,
      nodeY: 25,
      color: '#39FF14'
    }
  };

  metricButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      metricButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const type = btn.getAttribute('data-metric');
      const data = metricData[type];

      if (data && chartPathStroke && chartPathGlow) {
        chartPathStroke.setAttribute('d', data.path);
        chartPathGlow.setAttribute('d', data.glowPath);
        
        chartPathStroke.setAttribute('stroke', data.color);
        const glowStop1 = document.getElementById('gradient-stop-1');
        if (glowStop1) glowStop1.setAttribute('stop-color', data.color);

        chartNodePulse.setAttribute('cx', data.nodeX);
        chartNodePulse.setAttribute('cy', data.nodeY);
        chartNodePulse.setAttribute('fill', data.color);
        
        chartNodeRing.setAttribute('cx', data.nodeX);
        chartNodeRing.setAttribute('cy', data.nodeY);
        chartNodeRing.setAttribute('stroke', data.color);
        chartNodeRing.style.transformOrigin = `${data.nodeX}px ${data.nodeY}px`;

        animateValue(metricVal, data.val);
        metricLabel.textContent = data.label;
        metricGrowth.textContent = data.growth;
        dashTitle.textContent = data.title;
      }
    });
  });

  function animateValue(element, finalVal) {
    if (!element) return;
    const isPercent = finalVal.includes('%');
    const isK = finalVal.includes('K');
    
    const parsedFinal = parseFloat(finalVal);
    let start = 0;
    const duration = 800;
    const startTime = performance.now();

    function updateText(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeVal = progress * (2 - progress);
      const current = start + easeVal * (parsedFinal - start);
      
      if (isPercent) {
        element.textContent = `${current.toFixed(2)}%`;
      } else if (isK) {
        element.textContent = `${current.toFixed(1)}K`;
      } else {
        element.textContent = current.toFixed(2);
      }

      if (progress < 1) {
        requestAnimationFrame(updateText);
      } else {
        element.textContent = finalVal;
      }
    }

    requestAnimationFrame(updateText);
  }


  // --------------------------------------------------------------------------
  // 5B. INTERACTIVE 3D HOLOGRAPHIC QUANTUM CORE ENGINE
  // --------------------------------------------------------------------------
  const hero3dCanvas = document.getElementById('hero-3d-canvas');
  if (hero3dCanvas) {
    const ctx = hero3dCanvas.getContext('2d');
    let width = (hero3dCanvas.width = hero3dCanvas.offsetWidth);
    let height = (hero3dCanvas.height = hero3dCanvas.offsetHeight);

    const points = [];
    const radius = 90;
    const maxPoints = 140;

    // Distribute points evenly on a sphere using Golden Spiral method
    for (let i = 0; i < maxPoints; i++) {
      const theta = Math.acos(-1 + (2 * i) / maxPoints);
      const phi = Math.sqrt(maxPoints * Math.PI) * theta;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      points.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        size: Math.random() * 1.5 + 1.0,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    // Interactive pointer attractor coordinates
    let rightColumnMouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    const rightCol = document.querySelector('.hero-right');
    if (rightCol) {
      rightCol.addEventListener('mousemove', (e) => {
        const rect = rightCol.getBoundingClientRect();
        rightColumnMouse.targetX = e.clientX - rect.left - rect.width / 2;
        rightColumnMouse.targetY = e.clientY - rect.top - rect.height / 2;
        rightColumnMouse.active = true;
      });
      rightCol.addEventListener('mouseleave', () => {
        rightColumnMouse.active = false;
      });
    }

    let rotX = 0.003;
    let rotY = 0.005;
    let angleX = 0;
    let angleY = 0;
    let baseSpeedX = 0.002;
    let baseSpeedY = 0.004;

    const satellites = [
      { angle: 0, speed: 0.015, rx: 130, ry: 30, rz: 110, color: 'rgba(255, 122, 0, ', trail: [] },
      { angle: Math.PI, speed: -0.012, rx: 115, ry: -40, rz: 115, color: 'rgba(57, 255, 20, ', trail: [] }
    ];

    function renderHero3D() {
      // Performance optimization: only render if home-view is active
      const homeView = document.getElementById('home-view');
      if (homeView && !homeView.classList.contains('active')) {
        requestAnimationFrame(renderHero3D);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth pointer mouse target tracking
      rightColumnMouse.x += (rightColumnMouse.targetX - rightColumnMouse.x) * 0.08;
      rightColumnMouse.y += (rightColumnMouse.targetY - rightColumnMouse.y) * 0.08;

      // Adjust rotation speed depending on pointer attraction
      if (rightColumnMouse.active) {
        rotX += (0.01 - rotX) * 0.05;
        rotY += (0.015 - rotY) * 0.05;
      } else {
        rotX += (baseSpeedX - rotX) * 0.05;
        rotY += (baseSpeedY - rotY) * 0.05;
      }

      angleX += rotX;
      angleY += rotY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = [];
      const distance = 400;

      // Project and render 3D Core sphere nodes
      points.forEach((p) => {
        let x1 = p.baseX * cosY - p.baseZ * sinY;
        let z1 = p.baseX * sinY + p.baseZ * cosY;
        let y2 = p.baseY * cosX - z1 * sinX;
        let z2 = p.baseY * sinX + z1 * cosX;

        // Mouse warp attraction physics
        if (rightColumnMouse.active) {
          const dx = rightColumnMouse.x - x1;
          const dy = rightColumnMouse.y - y2;
          const distMouse = Math.sqrt(dx * dx + dy * dy);
          if (distMouse < 180) {
            const warp = (180 - distMouse) / 180 * 18;
            x1 += (dx / distMouse) * warp;
            y2 += (dy / distMouse) * warp;
          }
        }

        const scale = distance / (distance + z2);
        const px = x1 * scale + width / 2;
        const py = y2 * scale + height / 2;

        projected.push({ x: px, y: py, z: z2, scale, size: p.size * scale, opacity: p.opacity });
      });

      // Draw elegant connection latticework
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 42) {
            const avgZ = (p1.z + p2.z) / 2;
            const opacity = (1 - dist / 42) * 0.14 * (1 - (avgZ + radius) / (2 * radius));
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 122, 0, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // Render nodes themselves
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const depthOpacity = 0.15 + (1 - (p.z + radius) / (2 * radius)) * 0.8;
        ctx.fillStyle = `rgba(255, 158, 67, ${p.opacity * depthOpacity})`;
        
        if (p.z < 0 && p.opacity > 0.6) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(255, 122, 0, 0.4)';
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      ctx.shadowBlur = 0;

      // Update & Draw orbital rings wireframes
      ctx.lineWidth = 0.7;
      satellites.forEach((sat) => {
        sat.angle += sat.speed;

        const sx = sat.rx * Math.cos(sat.angle);
        const sz = sat.rz * Math.sin(sat.angle);
        const sy = sat.ry * Math.cos(sat.angle * 0.6);

        const scale = distance / (distance + sz);
        const px = sx * scale + width / 2;
        const py = sy * scale + height / 2;

        sat.trail.push({ x: px, y: py });
        if (sat.trail.length > 12) sat.trail.shift();

        ctx.beginPath();
        for (let i = 0; i < sat.trail.length - 1; i++) {
          const ratio = i / sat.trail.length;
          ctx.strokeStyle = `${sat.color}${ratio * 0.28})`;
          ctx.lineTo(sat.trail[i].x, sat.trail[i].y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = sat.color + '1)';
        ctx.shadowBlur = 12;
        ctx.shadowColor = sat.color + '0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(renderHero3D);
    }

    window.addEventListener('resize', () => {
      if (hero3dCanvas.offsetWidth > 0) {
        width = hero3dCanvas.width = hero3dCanvas.offsetWidth;
        height = hero3dCanvas.height = hero3dCanvas.offsetHeight;
      }
    });

    renderHero3D();
  }

  // --------------------------------------------------------------------------
  // 5C. INTERACTIVE CHATBOT SIMULATOR ENGINE
  // --------------------------------------------------------------------------
  const chatReplies = document.querySelectorAll('.reply-btn');
  const chatBox = document.getElementById('agent-chat-box');

  const chatResponses = {
    optimize: [
      { type: 'user', text: 'How do we optimize advertising operations?' },
      { type: 'thinking', text: '' },
      { type: 'ai', text: 'Compiling real-time telemetry... Analyzing channel metrics. Deployed 18 automated micro-spend optimization workflows. Advertising cost overhead reduced by 22% and conversion rate surged by 18.2%!' }
    ],
    workflows: [
      { type: 'user', text: 'Can we chain AI workflow models?' },
      { type: 'thinking', text: '' },
      { type: 'ai', text: 'Cognitive models synchronized. Configured native pipeline integrations spanning biometrics kiosk terminals, Prisma SQLite instances, and secure multi-level administrative logs. System integrity locked.' }
    ],
    scale: [
      { type: 'user', text: 'What is the system scalability ratio?' },
      { type: 'thinking', text: '' },
      { type: 'ai', text: 'Scanning container orchestrations... Auto-scaling microservices verified across AWS and Google Cloud instances. Redundant nodes initialized with 100% hot fail-safe capability and a 99.99% uptime guarantee.' }
    ]
  };

  let chatBusy = false;

  if (chatReplies.length > 0 && chatBox) {
    chatReplies.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (chatBusy) return;
        chatBusy = true;

        const type = btn.getAttribute('data-reply');
        const script = chatResponses[type];

        if (!script) {
          chatBusy = false;
          return;
        }

        chatReplies.forEach((b) => b.style.opacity = '0.5');
        chatBox.innerHTML = '';

        let stepIdx = 0;

        function runNextChatStep() {
          if (stepIdx >= script.length) {
            chatBusy = false;
            chatReplies.forEach((b) => b.style.opacity = '1');
            return;
          }

          const step = script[stepIdx];
          
          if (step.type === 'user') {
            const userDiv = document.createElement('div');
            userDiv.className = 'chat-bubble user';
            userDiv.textContent = step.text;
            chatBox.appendChild(userDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
            
            stepIdx++;
            setTimeout(runNextChatStep, 500);
          } else if (step.type === 'thinking') {
            const thinkingDiv = document.createElement('div');
            thinkingDiv.className = 'chat-bubble ai thinking';
            thinkingDiv.innerHTML = `
              <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            `;
            chatBox.appendChild(thinkingDiv);
            chatBox.scrollTop = chatBox.scrollHeight;

            stepIdx++;
            setTimeout(() => {
              thinkingDiv.remove();
              runNextChatStep();
            }, 900);
          } else if (step.type === 'ai') {
            const aiDiv = document.createElement('div');
            aiDiv.className = 'chat-bubble ai';
            chatBox.appendChild(aiDiv);

            let charIdx = 0;
            const speed = 15;

            function typeChar() {
              if (charIdx < step.text.length) {
                aiDiv.textContent += step.text.charAt(charIdx);
                chatBox.scrollTop = chatBox.scrollHeight;
                charIdx++;
                setTimeout(typeChar, speed);
              } else {
                stepIdx++;
                setTimeout(runNextChatStep, 400);
              }
            }

            typeChar();
          }
        }

        runNextChatStep();
      });
    });
  }


  // --------------------------------------------------------------------------
  // 6. DETAILED ROUTER NAVIGATION LOGIC (SPA VIEWS)
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link, [data-target]');
  const pageViews = document.querySelectorAll('.page-view');
  const mainHeader = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  function navigateTo(targetId) {
    if (!targetId) return;

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
    }

    pageViews.forEach((view) => {
      view.classList.remove('active');
    });

    const activeView = document.getElementById(`${targetId}-view`);
    if (activeView) {
      activeView.classList.add('active');
    }

    const targetNavLinks = document.querySelectorAll(`[data-target="${targetId}"]`);
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.remove('active');
    });
    targetNavLinks.forEach((link) => {
      if (link.classList.contains('nav-link')) {
        link.classList.add('active');
      }
    });

    history.pushState(null, null, `#${targetId}`);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        e.preventDefault();
        navigateTo(targetId);
      }
    });
  });

  window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1) || 'home';
    const validViews = ['home', 'about', 'services', 'solutions', 'portfolio', 'ai-solutions', 'contact'];
    if (validViews.includes(hash)) {
      navigateTo(hash);
    }
  });

  const initialHash = window.location.hash.substring(1) || 'home';
  navigateTo(initialHash);


  // --------------------------------------------------------------------------
  // 7. AMBIENT SCROLL-DRIVEN PARALLAX & GRAPHICS
  // --------------------------------------------------------------------------
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const maxScroll = documentHeight - windowHeight;
    const pct = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = `${pct}%`;

    if (scrollTop > 30) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }

    // Scroll scales parallax cards
    const scrollRevealEls = document.querySelectorAll('.scroll-scale-up');
    scrollRevealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top;
      
      if (elementTop < windowHeight && rect.bottom > 0) {
        const pctEntered = (windowHeight - elementTop) / (windowHeight + rect.height);
        
        const scaleVal = 0.96 + Math.min(0.04, pctEntered * 0.08);
        const yVal = Math.max(0, 30 - pctEntered * 60);
        const opacityVal = Math.min(1, pctEntered * 1.8);

        el.style.setProperty('--scroll-scale', scaleVal);
        el.style.setProperty('--scroll-y-shift', `${yVal}px`);
        el.style.setProperty('--scroll-opacity', opacityVal);
      }
    });

    // Parallax background glows
    const orangeGlow = document.getElementById('glow-orange');
    const greenGlow = document.getElementById('glow-green');
    if (orangeGlow) orangeGlow.style.transform = `translateY(${scrollTop * 0.15}px)`;
    if (greenGlow) greenGlow.style.transform = `translateY(${scrollTop * -0.1}px)`;
  });





  // --------------------------------------------------------------------------
  // 10. TABS/FILTERS & PORTFOLIO ACTION TRIGGERS
  // --------------------------------------------------------------------------
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350);
        }
      });
    });
  });


  // --------------------------------------------------------------------------
  // 11. METRICS INITIAL LOAD-IN
  // --------------------------------------------------------------------------
  let wasAnimated = false;
  function animateDashboardMetric() {
    const counterEl = document.getElementById('dashboard-users-count');
    if (!counterEl || wasAnimated) return;
    wasAnimated = true;
    animateValue(counterEl, '25.6K');
  }

  if (initialHash === 'home') {
    setTimeout(animateDashboardMetric, 500);
  }


  // --------------------------------------------------------------------------
  // 12. LEAD CONTACT FORM CAPTURES
  // --------------------------------------------------------------------------
  const leadForm = document.getElementById('lead-contact-form');
  const formSuccess = document.getElementById('form-success-msg');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      formSubmitBtn.disabled = true;
      const originalText = formSubmitBtn.innerHTML;
      formSubmitBtn.innerHTML = `
        <span>Processing Request...</span>
        <svg class="submit-arrow spinner" viewBox="0 0 24 24" width="18" height="18" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#050816" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"></circle>
        </svg>
      `;

      setTimeout(() => {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalText;
        
        if (formSuccess) formSuccess.style.display = 'flex';
        leadForm.reset();

        setTimeout(() => {
          if (formSuccess) {
            formSuccess.style.opacity = '0';
            setTimeout(() => {
              formSuccess.style.display = 'none';
              formSuccess.style.opacity = '1';
            }, 400);
          }
        }, 7000);

      }, 1800);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      if (newsletterSuccess) {
        newsletterSuccess.style.display = 'block';
        setTimeout(() => {
          newsletterSuccess.style.display = 'none';
        }, 5000);
      }
    });
  }


  // --------------------------------------------------------------------------
  // 13. INTERSECTION OBSERVER FOR INTERMEDIATE SCROLL REVEALS
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.fade-up, .timeline-card, .team-card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach((el) => {
      el.classList.add('scroll-scale-up');
      observer.observe(el);
    });
  } else {
    revealElements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }


  // --------------------------------------------------------------------------
  // 14. 3D VECTOR GRAPHICS ENGINE (LAPTOP GLOBE & SERVICES NEURAL NET)
  // --------------------------------------------------------------------------

  // --- A. LAPTOP SCREEN 3D WIREFRAME GLOBE ---
  const laptopCanvas = document.getElementById('laptop-3d-canvas');
  if (laptopCanvas) {
    const ctx = laptopCanvas.getContext('2d');
    let width = (laptopCanvas.width = laptopCanvas.offsetWidth);
    let height = (laptopCanvas.height = laptopCanvas.offsetHeight);

    const radius = 45;
    const points = [];
    const lines = [];
    const numRings = 5;
    const numPointsPerRing = 18;

    // Generate Longitude rings
    for (let r = 0; r < numRings; r++) {
      const phi = (r * Math.PI) / numRings;
      const ringPoints = [];
      for (let p = 0; p < numPointsPerRing; p++) {
        const theta = (p * 2 * Math.PI) / numPointsPerRing;
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);
        points.push({ x, y, z, color: 'rgba(255, 122, 0, ' }); // Orange longitude
        ringPoints.push(points.length - 1);
      }
      for (let p = 0; p < numPointsPerRing; p++) {
        lines.push([ringPoints[p], ringPoints[(p + 1) % numPointsPerRing]]);
      }
    }

    // Generate Latitude rings
    const numLatRings = 3;
    for (let r = 1; r <= numLatRings; r++) {
      const ringY = radius * Math.cos((r * Math.PI) / (numLatRings + 1));
      const ringRadius = radius * Math.sin((r * Math.PI) / (numLatRings + 1));
      const ringPoints = [];
      for (let p = 0; p < numPointsPerRing; p++) {
        const theta = (p * 2 * Math.PI) / numPointsPerRing;
        const x = ringRadius * Math.sin(theta);
        const y = ringY;
        const z = ringRadius * Math.cos(theta);
        points.push({ x, y, z, color: 'rgba(57, 255, 20, ' }); // Green latitude
        ringPoints.push(points.length - 1);
      }
      for (let p = 0; p < numPointsPerRing; p++) {
        lines.push([ringPoints[p], ringPoints[(p + 1) % numPointsPerRing]]);
      }
    }

    // Satellites orbiting globe
    const satellites = [
      { angle: 0, speed: 0.024, rx: 65, ry: 15, rz: 50, color: 'rgba(0, 255, 179, ', trail: [] },
      { angle: Math.PI, speed: -0.016, rx: 60, ry: -25, rz: 60, color: 'rgba(255, 122, 0, ', trail: [] }
    ];

    let rotX = 0.005;
    let rotY = 0.008;
    let angleX = 0;
    let angleY = 0;

    function renderLaptop3D() {
      // Only animate if home view is actually active (performance optimization)
      const homeView = document.getElementById('home-view');
      if (homeView && !homeView.classList.contains('active')) {
        requestAnimationFrame(renderLaptop3D);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Interpolate angles
      angleX += rotX;
      angleY += rotY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = [];
      const dist = 280;

      // Project 3D points
      points.forEach((p) => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        // Perspective Projection
        const scale = dist / (dist + z2);
        const px = x1 * scale + width / 2;
        const py = y2 * scale + height / 2;

        projected.push({ x: px, y: py, z: z2, alpha: 0.15 + (1 - (z2 + radius) / (2 * radius)) * 0.45, color: p.color });
      });

      // Draw wireframe connection lines
      ctx.lineWidth = 0.65;
      lines.forEach((line) => {
        const p1 = projected[line[0]];
        const p2 = projected[line[1]];

        // Backface thinning
        const avgZ = (p1.z + p2.z) / 2;
        const opacityMultiplier = avgZ > 0 ? 0.35 : 1.0;
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        
        const avgAlpha = (p1.alpha + p2.alpha) / 2;
        ctx.strokeStyle = `${p1.color}${avgAlpha * opacityMultiplier})`;
        ctx.stroke();
      });

      // Update & Draw Satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        
        // Orbit calculations
        const x3d = sat.rx * Math.cos(sat.angle);
        const z3d = sat.rz * Math.sin(sat.angle);
        const y3d = sat.ry * Math.cos(sat.angle * 0.5);

        // Project
        const scale = dist / (dist + z3d);
        const px = x3d * scale + width / 2;
        const py = y3d * scale + height / 2;

        // Trail manager
        sat.trail.push({ x: px, y: py });
        if (sat.trail.length > 10) sat.trail.shift();

        // Draw trail lines
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        for (let i = 0; i < sat.trail.length - 1; i++) {
          const ratio = i / sat.trail.length;
          ctx.strokeStyle = `${sat.color}${ratio * 0.35})`;
          ctx.lineTo(sat.trail[i].x, sat.trail[i].y);
        }
        ctx.stroke();

        // Draw satellite glow node
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = sat.color + '1)';
        ctx.fill();
      });

      requestAnimationFrame(renderLaptop3D);
    }

    window.addEventListener('resize', () => {
      if (laptopCanvas.offsetWidth > 0) {
        width = laptopCanvas.width = laptopCanvas.offsetWidth;
        height = laptopCanvas.height = laptopCanvas.offsetHeight;
      }
    });

    renderLaptop3D();
  }


  // --- B. SERVICES SECTION 3D NEURAL NET Attractor ---
  const servicesCanvas = document.getElementById('services-3d-canvas');
  if (servicesCanvas) {
    const ctx = servicesCanvas.getContext('2d');
    let width = (servicesCanvas.width = servicesCanvas.offsetWidth);
    let height = (servicesCanvas.height = servicesCanvas.offsetHeight);

    const maxNodes = 32;
    const nodes = [];
    const dist = 320;
    
    // Attractor Mouse Position
    let attractor = { x: 0, y: 0, targetX: 0, targetY: 0, z: 0, active: false };

    // Generate Nodes distributed inside a sphere
    for (let i = 0; i < maxNodes; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.random() * 85 + 20;
      
      const x = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.sin(phi) * Math.cos(theta);
      const z = r * Math.cos(phi);

      nodes.push({
        x: x, y: y, z: z,
        baseX: x, baseY: y, baseZ: z,
        vx: 0, vy: 0, vz: 0,
        size: Math.random() * 1.8 + 1.2,
        colorSeed: Math.random()
      });
    }

    // Canvas listeners
    servicesCanvas.addEventListener('mousemove', (e) => {
      const rect = servicesCanvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - width / 2;
      const my = e.clientY - rect.top - height / 2;
      
      attractor.targetX = mx;
      attractor.targetY = my;
      attractor.active = true;
    });

    servicesCanvas.addEventListener('mouseleave', () => {
      attractor.active = false;
    });

    let angleX = 0.003;
    let angleY = 0.004;

    function renderServices3D() {
      // Performance optimization
      const servicesView = document.getElementById('services-view');
      if (servicesView && !servicesView.classList.contains('active')) {
        requestAnimationFrame(renderServices3D);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate attractor
      if (attractor.active) {
        attractor.x += (attractor.targetX - attractor.x) * 0.1;
        attractor.y += (attractor.targetY - attractor.y) * 0.1;
      } else {
        // Return attractor back to 0
        attractor.x += (0 - attractor.x) * 0.05;
        attractor.y += (0 - attractor.y) * 0.05;
      }

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = [];

      nodes.forEach((node) => {
        // Rotate local bases
        let x1 = node.baseX * cosY - node.baseZ * sinY;
        let z1 = node.baseX * sinY + node.baseZ * cosY;
        let y2 = node.baseY * cosX - z1 * sinX;
        let z2 = node.baseY * sinX + z1 * cosX;

        // Apply updated base rotation
        node.baseX = x1;
        node.baseY = y2;
        node.baseZ = z2;

        // Attractor Spring Physics: Pull points towards mouse
        let targetX = node.baseX;
        let targetY = node.baseY;
        let targetZ = node.baseZ;

        if (attractor.active) {
          const dx = attractor.x - node.x;
          const dy = attractor.y - node.y;
          const distMouse = Math.sqrt(dx * dx + dy * dy);

          if (distMouse < 160) {
            const pullFactor = (160 - distMouse) / 160;
            targetX += dx * pullFactor * 0.45;
            targetY += dy * pullFactor * 0.45;
          }
        }

        // Standard Hooke's elastic restore force
        node.vx += (targetX - node.x) * 0.08;
        node.vy += (targetY - node.y) * 0.08;
        node.vz += (targetZ - node.z) * 0.08;

        // Friction deceleration damping
        node.vx *= 0.85;
        node.vy *= 0.85;
        node.vz *= 0.85;

        // Move nodes
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Perspective project
        const scale = dist / (dist + node.z);
        const px = node.x * scale + width / 2;
        const py = node.y * scale + height / 2;

        projected.push({ x: px, y: py, z: node.z, size: node.size * scale, colorSeed: node.colorSeed });
      });

      // Draw Connections (Neural net paths)
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dz = projected[i].z - projected[j].z;
          const distPoints = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Threshold for links
          if (distPoints < 80) {
            const opacity = (1 - distPoints / 80) * 0.16;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);

            // Connect using glowing colors based on seeds
            const colorVal = projected[i].colorSeed < 0.4 ? 'rgba(0, 255, 179, ' : projected[i].colorSeed < 0.8 ? 'rgba(57, 255, 20, ' : 'rgba(255, 122, 0, ';
            ctx.strokeStyle = `${colorVal}${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const nodeColor = p.colorSeed < 0.4 ? 'rgba(0, 255, 179, ' : p.colorSeed < 0.8 ? 'rgba(57, 255, 20, ' : 'rgba(255, 122, 0, ';
        const zOpacity = 0.2 + (1 - (p.z + 100) / 200) * 0.8; // Z depth opacity mapping
        
        ctx.fillStyle = `${nodeColor}${zOpacity})`;
        ctx.fill();

        // Node aura spotlight glows
        if (p.colorSeed > 0.7 && attractor.active) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `${nodeColor}${zOpacity * 0.12})`;
          ctx.fill();
        }
      });

      requestAnimationFrame(renderServices3D);
    }

    window.addEventListener('resize', () => {
      if (servicesCanvas.offsetWidth > 0) {
        width = servicesCanvas.width = servicesCanvas.offsetWidth;
        height = servicesCanvas.height = servicesCanvas.offsetHeight;
      }
    });

    renderServices3D();
  }


});

