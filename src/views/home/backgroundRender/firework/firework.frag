uniform sampler2D uNoise;

#define TIME_ACTIVE iTime/2.
#define SCALE_ACTIVE 1.

#define ACTIVE_EDGE .99
#define PI2 3.14 / 2.

vec3 noise(vec2 st){
    return texture(uNoise,st,0.).rgb;
}

void main(){
    vec2 st=fragCoord.xy/iResolution.xy;
    st.y*=iResolution.y/iResolution.x;
    
    st.y *= (2. * cos(st.y + PI2));
    vec3 n=noise(st/SCALE_ACTIVE);
    
    float r=fract(n.r+TIME_ACTIVE);
    
    fragColor = vec4(0.);

    float isActive=r;
    
    if(isActive>ACTIVE_EDGE){
        float v=1.-(isActive-ACTIVE_EDGE)/(1.-ACTIVE_EDGE);
        fragColor=vec4(v,0.,0.,1.);
    }
    
    // fragColor=vec4(st.xy,0.,1.);
    // fragColor=vec4(0., 0., 0., 1.);

}
