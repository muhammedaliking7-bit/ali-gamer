/**
 * NEXUS REALM - Cyber Interactive Particle & Grid Canvas
 */

class CyberParticleCanvas {
  constructor(canvasId = "cyber-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 55;
    this.mouse = { x: -1000, y: -1000, radius: 120 };
    this.animationFrameId = null;
    this.isRunning = false;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    window.addEventListener("mouseleave", () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    this.createParticles();
    this.start();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = Math.max(window.innerHeight, 900);
  }

  createParticles() {
    this.particles = [];
    const colors = [
      { r: 0, g: 240, b: 255 },    // Neon Cyan
      { r: 168, g: 85, b: 247 },   // Neon Purple
      { r: 59, g: 130, b: 246 },   // Electric Blue
      { r: 255, g: 0, b: 85 }      // Subtle Cyber Crimson
    ];

    for (let i = 0; i < this.particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2.2 + 0.8,
        color: color,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Subtle cyberpunk horizon grid lines
    const gridSpacing = 80;
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = "rgba(147, 51, 234, 0.04)";

    // Connect particles with glowing web
    const connectDistance = 140;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectDistance) {
          const strength = (1 - dist / connectDistance) * 0.25;
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${strength})`;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Update & draw particles
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Mouse repulsion / attraction
      const mdx = p.x - this.mouse.x;
      const mdy = p.y - this.mouse.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < this.mouse.radius) {
        const force = (1 - mDist / this.mouse.radius) * 2;
        p.x += (mdx / mDist) * force;
        p.y += (mdy / mDist) * force;
      }

      // Pulse glow
      p.pulseAngle += p.pulseSpeed;
      const currentAlpha = p.alpha + Math.sin(p.pulseAngle) * 0.15;

      // Particle body
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.1, currentAlpha)})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Outer glow for larger particles
      if (p.size > 1.8) {
        this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.02, currentAlpha * 0.2)})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });

    if (this.isRunning) {
      this.animationFrameId = requestAnimationFrame(() => this.draw());
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.draw();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

window.CyberParticleCanvas = CyberParticleCanvas;
