import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface VaporTrailProps {
  position: [number, number, number]; // local position on the jet (wingtip)
  length?: number;
  opacity?: number;
}

const TRAIL_POINTS = 80;

export function VaporTrail({ position, length = 12, opacity = 0.3 }: VaporTrailProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const points = useMemo(
    () =>
      Array.from({ length: TRAIL_POINTS }, (_, i) => {
        const t = i / (TRAIL_POINTS - 1);
        return new THREE.Vector3(-t * length, 0, 0);
      }),
    [length]
  );
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  const geometry = useMemo(() => {
    const tubeGeo = new THREE.TubeGeometry(curve, TRAIL_POINTS - 1, 0.04, 6, false);

    // Fade alpha along the trail (1 at tip, 0 at tail)
    const count = tubeGeo.attributes.position.count;
    const alphas = new Float32Array(count);
    const positions = tubeGeo.attributes.position;

    // Find min/max X to normalize
    let minX = Infinity, maxX = -Infinity;
    for (let i = 0; i < count; i++) {
      const x = positions.getX(i);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
    const rangeX = maxX - minX || 1;

    for (let i = 0; i < count; i++) {
      const x = positions.getX(i);
      alphas[i] = (x - minX) / rangeX; // 0 at tail, 1 at tip
    }
    tubeGeo.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    return tubeGeo;
  }, [curve]);

  // Animate slight wavering
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.set(
      position[0],
      position[1] + Math.sin(t * 2 + position[2]) * 0.005,
      position[2]
    );
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
