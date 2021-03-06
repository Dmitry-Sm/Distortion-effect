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

vec2 cicle_uv(vec2 uv) {
    return abs(1. - fract((uv + 1.)/2.) * 2.);
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
    // float f = fbm(uv * 2. + u_time / 50.);
    // f = fbm(uv * 2. + f * 20. * (1. - u_progress / 10.));


    // float prog = u_progress * f + u_progress;
    // prog = clamp(prog, 0., 1.);
    float ofset = 0.1;
    float colomns    = fract((uv.x + 0.25) * 16.);
    float left_diag  = fract((uv.x + uv.y)* 8.);
    float right_diag = fract((-uv.x + uv.y)* 8.);
    
    colomns    = smoothstep(0., 0. + ofset, colomns)    - smoothstep(0.5, 0.5 + ofset, colomns);
    left_diag  = smoothstep(0., 0. + ofset, left_diag)  - smoothstep(0.5, 0.5 + ofset, left_diag);
    right_diag = smoothstep(0., 0. + ofset, right_diag) - smoothstep(0.5, 0.5 + ofset, right_diag);

    float sum = colomns + left_diag + right_diag;
    float s = 0.;
    if (sum > 0.5 &&
        sum < 1.5) {
        s = sum;
    }
    if (sum > 2.5 &&
        sum < 3.5) {
        s = sum - 2.;
    }
    s = cos((sum) * PI) / 2. + 0.5;
    s -= -3.;
    s /= 22.;
    // s = smoothstep(0.1, 0.2, fract(uv.x * 4.)) - 
    //     smoothstep(0.8, 0.9, fract(uv.x * 4.));
    float prog_r = smoothstep(0.1, 0.4, u_progress);
    float prog_g = smoothstep(0.3, 0.6, u_progress);
    float prog_b = smoothstep(0.5, 0.9, u_progress);
    
    // vec2 uv_r = vec2(uv.x, uv.y);
    // vec2 uv_g = vec2(uv.x, uv.y);
    // vec2 uv_b = vec2(uv.x, uv.y);

    // vec2 uv_r = vec2(uv.x, uv.y + 1. - prog_r);
    // vec2 uv_g = vec2(uv.x + 1. - prog_g, uv.y);
    // vec2 uv_b = vec2(uv.x + 1. - prog_b, uv.y + 1. - prog_b);
    // vec2 uv_r = vec2(uv.x, uv.y + (1. - prog_r) * (1. - sin(uv.x * 12.)/4.));
    // vec2 uv_g = vec2(uv.x + (1. - prog_g) * (1. - sin(uv.y * 12.)/4.), uv.y);
    // vec2 uv_b = vec2(uv.x + (1. - prog_b) * (1. - sin(uv.x * 12.)/4.), uv.y + (1. - prog_b) * (1. - sin(uv.y * 12.)/4.));
    // uv2.y *= max(0.5, smoothstep(0.1, 0.2, u_progress));
    vec4 img1 = texture2D(u_texture1, uv);
    float img2tr = texture2D(u_texture2, uv).r;
    float img2tg = texture2D(u_texture2, uv).g;
    float img2tb = texture2D(u_texture2, uv).b;
    
    vec2 uv_r = vec2(uv.x + img2tr * sin(u_time/10.) * (1. - prog_r), uv.y + img2tr * 2. * sin(u_time/10.) * (1. - prog_r));
    vec2 uv_g = vec2(uv.x + img2tg * sin(u_time/10.) * (1. - prog_g), uv.y - img2tg * 2. * sin(u_time/10.) * (1. - prog_g));
    vec2 uv_b = vec2(uv.x - img2tb * sin(u_time/10.) * (1. - prog_b), uv.y + img2tb * 2. * sin(u_time/10.) * (1. - prog_b));
    
    // vec2 uv_r = vec2(uv.x, uv.y);
    // vec2 uv_g = vec2(uv.x, uv.y);
    // vec2 uv_b = vec2(uv.x, uv.y);

    float img2r = texture2D(u_texture2, uv_r).r;
    float img2g = texture2D(u_texture2, uv_g).g;
    float img2b = texture2D(u_texture2, uv_b).b;

    float prog = smoothstep(0.1, 0.8, u_progress);
    // vec4 res = img1 * prog + img2 * (1. - prog);
    vec4 res = vec4(0.);
    res.r = mix(img1.r, img2r, prog_r);
    res.g = mix(img1.g, img2g, prog_g);
    res.b = mix(img1.b, img2b, prog_b);

    float b = fract(uv.x / 4.) * 4.;
    b = abs(1. - fract((uv.x + 1.)/2.) * 2. );

    gl_FragColor = vec4(res);
    // gl_FragColor = vec4(colomns, left_diag, right_diag, 1.);
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
// step( edge, x); 