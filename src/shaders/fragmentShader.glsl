

uniform vec3 uColor;
uniform float uTime;
uniform sampler2D uNormalTexture;

varying vec3 vPosition;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
varying vec2 vUv;

void main(){

    vec3 normal = texture2D(uNormalTexture, vUv).rgb;
    normal = normalize(normal * 2.0 - 1.0);

    float dist = distance(vPosition.z, 0.5);


    vec3 mixed2 = mix(uColorStart, uColorEnd, dist);

    gl_FragColor = vec4(mixed2,1.0);


}