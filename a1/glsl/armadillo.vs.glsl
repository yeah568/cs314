// Create shared variable for the vertex and fragment shaders
varying vec3 interpolatedNormal;
// varying vec3 interpolatedLight;
uniform vec3 lightPosition;

/* HINT: YOU WILL NEED MORE SHARED/UNIFORM VARIABLES TO COLOR ACCORDING TO COS(ANGLE) */

void main() {

    // Set shared variable to vertex normal

    vec3 l= vec3(0.0, 0.0, -1.0);
    float i = dot(lightPosition, normal);
    interpolatedNormal = vec3(i, i, i);

    // Multiply each vertex by the model-view matrix and the projection matrix to get final vertex position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
