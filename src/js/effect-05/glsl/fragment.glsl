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

float smin( float a, float b )
{
    float k = 0.001;
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}


float distance1(vec2 a, vec2 b) {
    return pow(pow(a.x - b.x, 2.) + pow(a.y - b.y, 2.), 0.5);
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

    float d_c = pow(pow(uv.x - 0.5, 2.) + pow(uv.y - 0.5, 2.), 0.5);
    d_c = smoothstep(0.02, 0.5, d_c);

    float color_type = 0.;

    d_c = 1. - d_c;
    float sum = d_c*2.;
    // for (float i = 0.1; i < 128.; i += 1.) {
    //     vec2 p = vec2(sin(u_time/10. * sin(i*24.))/4. +  0.5 + sin(i*28.)/5., 
    //                   cos(u_time/20. * sin(i*23.))/4.2 + 0.5 + sin(i*21.)/5.);
    //     float d_p = pow(pow(uv.x - p.x, 2.) + pow(uv.y - p.y, 2.), 0.5);
    //     d_p = smoothstep(0.01, 0.2, d_p);
    //     d_p = 1. - d_p;

    //     color_type += 0.01;
    //     sum += smin(d_p/2., sum)/2.;
    //     if (sum > 1.) {
    //         break;
    //     }
    // };
    // float prog = 1.;

    // for (float i = 0.5; i < 12.; i += 1.) {
    //     vec2 p = vec2(sin(-u_time/4. + PI*i/6.) / 2. * (-0.1  * i + 2. * u_progress) + 0.5, 
    //                   cos(-u_time/4. + PI*i/6.) / 2. * (-0.1  * i + 2. * u_progress) + 0.5);

    //     float d_p = pow(pow(uv.x - p.x, 2.) + pow(uv.y - p.y, 2.), 0.5);
    //     d_p = smoothstep(0.0 + u_progress * 4., 0.0 + u_progress * 6., d_p);

    //     prog = smin(prog, d_p);
    // }

    // vec2 p = vec2(sin(u_time/20.)/3. + 0.5, 
    //               cos(u_time/20.)/3. + 0.5);
    // float d_p = pow(pow(uv.x - p.x, 2.) + pow(uv.y - p.y, 2.), 0.5);
    // d_p = smoothstep(0.00, 0.00 + u_progress * 8., d_p);

    // vec2 p2 = vec2(sin(-u_time/20.)/4. + 0.5, 
    //                cos(-u_time/20.)/4. + 0.5);
    // float d_p2 = pow(pow(uv.x - p2.x, 2.) + pow(uv.y - p2.y, 2.), 0.5);
    // d_p2 = smoothstep(0.00, 0.00 + u_progress * 8., d_p2);

    float f = fbm(uv * 2. + u_time / 20000.);
    f = fbm(uv * 2. + f * 20. * (1. - u_progress / 10.));

    f = clamp(f, 0., 1.);


    vec3 v = vec3(uv.x, uv.y, 0.);
    v.z = min(step(v.x, 0.2), step(v.y, 0.2));

    for (float i = 0.5; i < 100.; i += 1.) {
        v = vec3(
            v.x  + sin(f * PI * 2.) * u_time/ 100000.,
            v.y  + cos(f * PI * 2.) * u_time/ 100000.,
            v.z * 0.99);


        if (distance1(vec2(v.x, v.y), uv) < 0.1) {
            break;
        }
    }

    float prog = f;
   
    // r = uv * r * u_progress;

    vec2 uv_centr = vec2(
        (uv.x - 0.5) * (1. - f/1.) + 0.5,
        (uv.y - 0.5) * (1. - f/1.) + 0.5);
    
    vec4 img1 = texture2D(u_texture1, cicle_uv(vec2(v.x, v.y)));
    vec4 img2 = texture2D(u_texture2, cicle_uv(uv));

    // img2.x += (1. - color_type) * sum;

    vec4 res = img1 * prog + img2 * (1. - prog);



    // gl_FragColor = vec4((color_type/2.) * sum, (1. - color_type) * sum, sum, 1.);
    // gl_FragColor = vec4(img1);
    // float x = step(uv.x, 0.2);
    gl_FragColor = vec4(distance1(vec2(v.x, v.y), uv), 0.2, 0.2, 1.);
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