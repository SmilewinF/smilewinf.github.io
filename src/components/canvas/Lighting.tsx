export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#87CEEB" />
      <directionalLight
        position={[100, 40, 100]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight args={["#87CEEB", "#445566", 0.5]} />
    </>
  );
}
