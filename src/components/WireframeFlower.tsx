"use client";

import { useEffect, useRef } from "react";

export function WireframeFlower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 3D Point structure
    type Point3D = { x: number; y: number; z: number };

    // Projection from 3D to 2D
    const project = (p: Point3D, width: number, height: number): { x: number; y: number } => {
      const scale = Math.min(width, height) * 0.4;
      // Perspective projection
      const zOffset = p.z + 2.5; // push it back
      const perspectiveScale = scale / zOffset;
      
      return {
        x: width / 2 + p.x * perspectiveScale,
        y: height / 2 - p.y * perspectiveScale // y-axis up
      };
    };

    // Rotate point around Y axis
    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos - p.z * sin,
        y: p.y,
        z: p.x * sin + p.z * cos
      };
    };

    // Rotate point around X axis
    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos
      };
    };

    // Rotate point around Z axis
    const rotateZ = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos - p.y * sin,
        y: p.x * sin + p.y * cos,
        z: p.z
      };
    };

    // Generate a single petal mesh
    const generatePetal = (numU: number, numV: number): Point3D[][] => {
      const points: Point3D[][] = [];
      for (let i = 0; i <= numU; i++) {
        const u = i / numU; // 0 to 1 (base to tip)
        const row: Point3D[] = [];
        for (let j = 0; j <= numV; j++) {
          const v = (j / numV) * 2 - 1; // -1 to 1 (left to right)
          
          // Parametric equation for a petal
          // Tip points up (y positive), base is at origin
          const length = 1.0;
          const widthScale = Math.sin(u * Math.PI) * 0.4; // Wide in middle, narrow at ends
          
          const x = v * widthScale;
          const y = u * length;
          
          // Bend the petal outwards (z direction)
          // Curves outward then slightly back in
          const z = Math.sin(u * Math.PI) * 0.3 * (1 - Math.abs(v)*0.2); 
          
          row.push({ x, y, z });
        }
        points.push(row);
      }
      return points;
    };

    // Generate multiple petals arranged in layers
    const petals: Point3D[][][] = [];
    
    // Base petal geometry
    const basePetal = generatePetal(12, 6);
    
    // Create 3 layers of petals
    const layers = [
      { count: 5, tilt: 1.2, scale: 1.2, yOffset: -0.2 }, // Outer open petals
      { count: 6, tilt: 0.6, scale: 0.9, yOffset: -0.1 }, // Middle petals
      { count: 4, tilt: 0.2, scale: 0.6, yOffset: 0.0 }   // Inner closed petals
    ];

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2;
        const tiltedPetal = basePetal.map(row => 
          row.map(p => {
            // Apply scale
            let pt = { x: p.x * layer.scale, y: p.y * layer.scale, z: p.z * layer.scale };
            // Tilt outwards (rotate around X axis by layer tilt)
            pt = rotateX(pt, layer.tilt);
            // Translate up/down
            pt.y += layer.yOffset;
            // Rotate around Y axis to arrange in circle
            pt = rotateY(pt, angle);
            return pt;
          })
        );
        petals.push(tiltedPetal);
      }
    });

    const draw = (timestamp: number = 0) => {
      // Use timestamp to ensure smooth, frame-rate independent looping
      const loopDuration = 12000; // 12 seconds per full loop
      const progress = (timestamp % loopDuration) / loopDuration;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Global rotation to view the flower
      const globalRotX = 0.4; // Looking down slightly
      const globalRotY = progress * Math.PI * 2; // Smooth 360-degree spin
      const globalRotZ = Math.sin(progress * Math.PI * 2) * 0.05; // Gentle sway

      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.lineJoin = "round";

      // Draw each petal
      petals.forEach(petal => {
        // Transform the whole petal first
        const transformedPetal = petal.map(row => 
          row.map(p => {
            // Sway
            let pt = rotateZ(p, globalRotZ);
            // Spin
            pt = rotateY(pt, globalRotY);
            // Tilt view
            pt = rotateX(pt, globalRotX);
            return pt;
          })
        );

        // Draw horizontal lines (u-curves)
        for (let i = 0; i < transformedPetal.length; i++) {
          ctx.beginPath();
          for (let j = 0; j < transformedPetal[i].length; j++) {
            const projected = project(transformedPetal[i][j], canvas.width, canvas.height);
            if (j === 0) ctx.moveTo(projected.x, projected.y);
            else ctx.lineTo(projected.x, projected.y);
          }
          ctx.stroke();
        }

        // Draw vertical lines (v-curves)
        for (let j = 0; j < transformedPetal[0].length; j++) {
          ctx.beginPath();
          for (let i = 0; i < transformedPetal.length; i++) {
            const projected = project(transformedPetal[i][j], canvas.width, canvas.height);
            if (i === 0) ctx.moveTo(projected.x, projected.y);
            else ctx.lineTo(projected.x, projected.y);
          }
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{
        filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))"
      }}
    />
  );
}
