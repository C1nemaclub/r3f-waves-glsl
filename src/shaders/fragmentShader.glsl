

uniform vec3 uColor;
uniform float uTime;

varying vec3 vPosition;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
void main(){


    float dist = distance(vPosition.z, 0.5);


    vec3 mixed2 = mix(uColorStart, uColorEnd, dist);

    gl_FragColor = vec4(mixed2,1.0);
}