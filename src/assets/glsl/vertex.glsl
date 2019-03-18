uniform float u_time;

varying vec2 vUv;
varying vec2 vUv1;
varying vec4 vPosition;
varying float f;

uniform vec2 pixels;
uniform vec2 uvRate1;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
