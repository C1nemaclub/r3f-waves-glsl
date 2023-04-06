

uniform float uTime;

void main(){

    vec3 pos = position;
    pos.z += sin(pos.x  * 2.0 + uTime);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}