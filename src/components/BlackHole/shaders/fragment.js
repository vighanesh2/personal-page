export const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Event horizon
    float blackHoleRadius = 0.2;
    
    // Accretion disk
    float diskInner = 0.2;
    float diskOuter = 0.4;
    
    if (dist < blackHoleRadius) {
      // Event horizon (pure black)
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else if (dist < diskOuter) {
      // Accretion disk
      float intensity = smoothstep(diskInner, diskOuter, dist);
      intensity *= 1.0 - smoothstep(diskInner, diskOuter, dist);
      
      // Create the glowing effect
      vec3 color1 = vec3(1.0, 0.7, 0.3); // Orange
      vec3 color2 = vec3(1.0, 1.0, 1.0); // White
      
      float timeEffect = sin(time * 2.0 + dist * 10.0) * 0.5 + 0.5;
      vec3 finalColor = mix(color1, color2, timeEffect);
      
      gl_FragColor = vec4(finalColor * intensity, 1.0);
    } else {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
  }
`;