#ifdef GL_ES
precision highp float;
#endif

#define PI 3.14159265359
varying vec2 vUv;
varying vec2 vUv1;

varying float xpos;
varying float ypos;
varying float zpos;
varying float f;

varying vec4 vPosition;

uniform float u_rate;
uniform vec2 u_mouse;
uniform float u_progress;
uniform float u_time;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;

#define NUM_OCTAVES 5

vec2 warp(vec2 pos, vec2 amplitude) {
    pos  = pos * 2.0-1.0;
    pos.x *= 1.0 - (pos.y*pos.y)*amplitude.x * 0.2;
    pos.y *= 1.0 + (pos.x*pos.x)*amplitude.y;
    return pos*0.5 + 0.5;
}

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

float impulse( float k, float x ) {
    float h = k*x;
    return h*exp(1.0-h);
}

/*
                        d8b          
                        Y8P          
                                     
 88888b.d88b.   8888b.  888 88888b.  
 888 "888 "88b     "88b 888 888 "88b 
 888  888  888 .d888888 888 888  888 
 888  888  888 888  888 888 888  888 
 888  888  888 "Y888888 888 888  888 
                                     
*/

void main() {

    vec2 uv = vUv;
    // if (u_rate > 1.) {
    //     uv.y = (uv.y - 0.5) / u_rate + 0.5;
    // }

    float prog = u_progress * fract(uv.y * 10. + (sin(uv.x * 50. + sin(uv.y * 20.)) / 4. + u_time/10.) + u_progress/4.) + u_progress;
    // float prog = u_progress * fract(uv.y * 10. + (sin(uv.x * 50.) / 4.) + u_progress/4.) + u_progress;
    prog = clamp(prog, 0., 1.);
    // prog = smoothstep(prog - 0.1, prog + 0.1, u_progress);
    prog = smoothstep(0.2, 0.8, prog);
    // prog = cos(prog * PI /2.);
    
    vec4 img1 = texture2D(u_texture1, uv * (1. - (1. - prog) / 15.));
    vec4 img2 = texture2D(u_texture2, uv * (1. - prog / 15.));

    prog = smoothstep(0.4, 0.6, prog);
    vec4 res = img1 * prog + img2 * (1. - prog);

    gl_FragColor = vec4(res);
}

// fract(x); // возвращает дробную часть аргумента
// ceil(x);  // ближайшее целое, большее либо равное x
// floor(x); // ближайшее целое, меньшее либо равное x
// sign(x);  // знак x
// abs(x);   // абсолютное значение x
// mod(x, 0.5); // x по модулю 0.5
// min(0.0, x);   // меньшее из x и 0.0
// max(0.0, x);   // большее из x и 0.0 
// pow(x, 5.0); // степень
// mix(x, y, a)
// clamp(x, 0.0, 1.0); // ограничение x промежутком от 0.0 до 1.0