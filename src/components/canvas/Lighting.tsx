export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Window light streaming in */}
      <pointLight position={[0, 4, -4.5]} intensity={0.8} color="#fff5e6" distance={12} />
    </>
  );
}
