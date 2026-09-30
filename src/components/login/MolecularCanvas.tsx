"use client";

import { useEffect, useRef, useCallback } from "react";

interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  orbitalRadius: number;
  orbitalSpeed: number;
  orbitalAngle: number;
  electrons: number;
  pulsePhase: number;
}

export function MolecularCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const atomsRef = useRef<Atom[]>([]);
  const animationRef = useRef<number>(0);

  const createAtoms = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 25000);
    const atoms: Atom[] = [];
    for (let i = 0; i < Math.min(count, 40); i++) {
      atoms.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 3 + 2,
        orbitalRadius: Math.random() * 20 + 15,
        orbitalSpeed: (Math.random() - 0.5) * 0.02,
        orbitalAngle: Math.random() * Math.PI * 2,
        electrons: Math.floor(Math.random() * 3) + 1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    return atoms;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      atomsRef.current = createAtoms(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const draw = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const atoms = atomsRef.current;
      const mouse = mouseRef.current;

      // Update atoms
      for (const atom of atoms) {
        // Mouse repulsion
        const dx = atom.x - mouse.x;
        const dy = atom.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          atom.vx += (dx / dist) * force * 0.1;
          atom.vy += (dy / dist) * force * 0.1;
        }

        atom.x += atom.vx;
        atom.y += atom.vy;

        // Damping
        atom.vx *= 0.995;
        atom.vy *= 0.995;

        // Boundaries with soft bounce
        if (atom.x < 30) atom.vx += 0.05;
        if (atom.x > w - 30) atom.vx -= 0.05;
        if (atom.y < 30) atom.vy += 0.05;
        if (atom.y > h - 30) atom.vy -= 0.05;

        // Update orbital angle
        atom.orbitalAngle += atom.orbitalSpeed;
        atom.pulsePhase += 0.02;
      }

      // Draw bonds
      const bondDistance = 160;
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const a = atoms[i];
          const b = atoms[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < bondDistance) {
            const opacity = (1 - dist / bondDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Double bond effect for close atoms
            if (dist < bondDistance * 0.5) {
              const perpX = -dy / dist * 3;
              const perpY = dx / dist * 3;
              ctx.beginPath();
              ctx.moveTo(a.x + perpX, a.y + perpY);
              ctx.lineTo(b.x + perpX, b.y + perpY);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Draw atoms and orbitals
      for (const atom of atoms) {
        const pulse = Math.sin(atom.pulsePhase) * 0.3 + 0.7;

        // Orbital rings (ellipse to fake 3D tilt)
        ctx.beginPath();
        ctx.ellipse(
          atom.x,
          atom.y,
          atom.orbitalRadius,
          atom.orbitalRadius * 0.35,
          atom.orbitalAngle * 3,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * pulse})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Second orbital ring (perpendicular)
        if (atom.electrons > 1) {
          ctx.beginPath();
          ctx.ellipse(
            atom.x,
            atom.y,
            atom.orbitalRadius * 0.35,
            atom.orbitalRadius,
            atom.orbitalAngle * 2,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * pulse})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Electrons on orbital
        for (let e = 0; e < atom.electrons; e++) {
          const angle = atom.orbitalAngle + (e * Math.PI * 2) / atom.electrons;
          const ex = atom.x + Math.cos(angle) * atom.orbitalRadius;
          const ey =
            atom.y +
            Math.sin(angle) * atom.orbitalRadius * 0.35;

          ctx.beginPath();
          ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * pulse})`;
          ctx.fill();
        }

        // Atom core glow
        const gradient = ctx.createRadialGradient(
          atom.x,
          atom.y,
          0,
          atom.x,
          atom.y,
          atom.radius * 4
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.15 * pulse})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Atom core
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * pulse})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * pulse})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [createAtoms]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: "default" }}
    />
  );
}
