
#version 330 core
in vec3 FragPos;
in vec2 TexCoords;
in vec3 TangentLightPos;
in vec3 TangentViewPos;
in vec3 TangentFragPos;
out vec4 FragColor;

uniform sampler2D diffuseMap;
uniform sampler2D normalMap;

void main(void)
{
    // get diffuse color
    vec3 color = texture(diffuseMap, TexCoords).rgb;
    vec3 normal = texture(normalMap, TexCoords).rgb;    // obtain normal from normal map in range [0,1]
    normal = normalize(normal * 2.0 - 1.0);             // transform normal vector to range [-1,1]
    //vec3 normal = vec3(0.0, 0.0, 1.0);

    /* blinn-phong */
    // ambient
    vec3 ambient = 0.1 * color;
    // diffuse
    vec3 lightDir = normalize(TangentLightPos - TangentFragPos);
    float diff = max(dot(lightDir, normal), 0.0);
    vec3 diffuse = diff * color;
    // specular
    vec3 viewDir = normalize(TangentViewPos - TangentFragPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    vec3 halfwayDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfwayDir), 0.0), 32.0);
    vec3 specular = vec3(0.2) * spec;

    FragColor = vec4(ambient + diffuse + specular, 1.0);
}
