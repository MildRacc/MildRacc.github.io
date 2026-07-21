precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
            
#define AA 4.

float scan = 0.125; // simulate darkness between scanlines

void DrawVignette( inout vec4 color, vec2 uv ) {  
    vec3 mask = vec3(0.0);  
    float vignette = uv.x * uv.y * ( 1.0 - uv.x ) * ( 1.0 - uv.y );
    vignette = clamp( pow( 32.0 * vignette, 0.3 ), 0.0, 1.0 );
    mask += (vignette) * 0.35;
    mask.rb /= 2.0;
    mask.g /= 1.25;
    color.rgb += mask;
}
void DrawScanline( inout vec4 color, vec2 uv ) {
    vec3 mask = vec3(0.0);
    float scanline = clamp( 0.95 + 0.05 * cos( 3.14 * ( uv.y + 0.008 * uTime ) * 240.0 * 1.0 ), 0.0, 1.0 );
    float grille = 0.85 + 0.15 * clamp( 1.5 * cos( 3.14 * uv.x * 640.0 * 1.0 ), 0.0, 1.0 );    
    mask += (0.9 - scanline) * 0.65;
    mask += (grille - 1.0) * 0.05;
    color.rgb += mask;
}



void main()
{
    // squared distance from center
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec4 color = vec4(0);

    for(float i = 0.; i < AA*AA - 0.5; i += 1.) {
    vec4 c = vec4(0.0);

    DrawVignette( c, uv );
    DrawScanline( c, uv );
    color += c / float(AA*AA);

    }
    gl_FragColor.rgb = (color.rgb*5.0);
    gl_FragColor.a = 0.5 - (color.a);
}
