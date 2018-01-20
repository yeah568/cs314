// Create shared variable. The value is given as the interpolation between normals computed in the vertex shader
varying vec3 interpolatedNormal;

float rand(vec3 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    // Set final rendered color according to the surface normal
  float r = rand(interpolatedNormal);
  float g = rand(vec3(r, r, r));
  float b = rand(vec3(g, g, g));

  gl_FragColor = vec4(r, g, b, 1.0);
}
