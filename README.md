
# Portafolio Web de David Luna

Portafolio personal desarrollado con React, Vite y Tailwind CSS, orientado a presentar perfil profesional, proyectos, experiencia, testimonios y medios de contacto dentro de una interfaz minimalista con inspiración japonesa.

Este README documenta el proyecto desde la perspectiva de diseño de interfaz: colores, tipografía, componentes visuales, estructura de navegación y funciones de cada sección principal.

## 1. Propósito del proyecto

El portafolio está diseñado para comunicar una identidad profesional sobria, técnica y clara. La experiencia visual se apoya en tres ideas:

- Minimalismo visual con alto contraste.
- Inspiración japonesa mediante patrones tipo tatami, marcos, bordes y tonos tierra.
- Navegación simple, rápida y consistente en escritorio y móvil.

La aplicación busca que el contenido principal sea el protagonista: presentación personal, proyectos, credibilidad social, formación y datos de contacto.

## 2. Stack del proyecto

- React 18
- Vite 6
- TypeScript
- Tailwind CSS 4
- React Router
- Motion para animaciones
- React Slick para el carrusel de testimonios
- Lucide React para iconografía

## 3. Sistema visual

### 3.1 Dirección estética

La interfaz utiliza una composición limpia con contenedores amplios, bordes notorios y una paleta reducida. El lenguaje visual evita ornamentos innecesarios y concentra la atención en bloques de contenido bien definidos.

Patrones visuales principales:

- Fondo con textura lineal tipo tatami.
- Tarjetas con borde visible y sombra suave.
- Uso consistente de tonos café, beige y dorado suave.
- Botones rectangulares o redondeados con presencia marcada.
- Iconografía lineal y legible.

### 3.2 Temas y modos visuales

El proyecto define tokens visuales globales en `src/styles/theme.css`.

Modos contemplados por el sistema:

- `default`: modo base claro.
- `tatami`: modo oscuro personalizado activado desde la interfaz.
- `.dark`: tokenización adicional disponible a nivel CSS, aunque el cambio visible implementado para el usuario está centrado en `default` y `tatami`.

### 3.3 Paleta de color principal

#### Base clara

| Uso | Color |
| --- | --- |
| Fondo general | `#F5F1E8` |
| Texto fuerte | `#2C2416` |
| Texto secundario | `#8B7355` |
| Acento | `#C4A57B` |
| Contraste sobre fondo oscuro | `#F5F1E8` |

#### Modo tatami

| Uso | Color |
| --- | --- |
| Fondo general | `#43494D` |
| Fondo de tarjeta | `#575357` |
| Acento principal | `#AA866D` |
| Texto principal | `#F5F1E8` |
| Texto secundario | `#D4C4B0` |

#### Colores estructurales muy usados en la interfaz

| Elemento | Color |
| --- | --- |
| Fondo de sidebar / footer / botones oscuros | `#2C2416` |
| Bordes principales | `#8B7355` |
| Acento de etiquetas y elementos resaltados | `#C4A57B` |

### 3.4 Tipografía

El proyecto no carga una fuente tipográfica personalizada propia en esta versión. La jerarquía tipográfica se define por escala, peso y espaciado usando tokens globales y utilidades Tailwind.

Decisiones tipográficas:

- Tamaño base global: `16px`.
- Peso medio para títulos y botones: `500`.
- Peso normal para texto continuo: `400`.
- Escalado amplio en títulos del hero y encabezados de sección.
- Alto contraste entre encabezados y texto descriptivo.

Jerarquía visual:

- `h1`: presentación principal del hero.
- `h2`: títulos de página.
- `h3` y `h4`: subtítulos, bloques de información y tarjetas.
- `p`: texto explicativo y descripciones.

### 3.5 Elementos visuales reutilizados

Elementos repetidos en varias vistas:

- `PageShell`: fondo compartido con patrón tatami y contenedor central.
- Tarjetas con `backdrop-blur`, borde `#8B7355` y fondo translúcido o semitransparente.
- Etiquetas tipo badge para tecnologías y categorías.
- Líneas divisorias finas para separar bloques.
- Iconos de `lucide-react` como apoyo funcional y visual.

## 4. Arquitectura de interfaz

### 4.1 Layout general

El layout principal contiene:

- Sidebar fija en escritorio.
- Navegación inferior en móvil.
- Botón flotante de cambio de tema.
- Cursor personalizado en escritorio.
- Menú circular activado por teclado.
- Pie de página persistente al final del contenido.

### 4.2 Navegación

La navegación está centralizada en una sola configuración y se reutiliza en múltiples componentes.

Rutas principales:

- Inicio
- Acerca de mí
- Proyectos
- Testimonios
- Experiencia
- Conóceme mejor
- Contacto

Características de navegación:

- Sidebar vertical en escritorio con tooltips.
- Bottom navigation en móvil.
- Indicador visual de ruta activa.
- Etiquetas traducibles según idioma.
- Menú circular alternativo con tecla `TAB` en escritorio.

### 4.3 Interacciones globales

Funciones de experiencia implementadas:

- Cambio de idioma `ES / EN`.
- Cambio de tema `default / tatami`.
- Menú circular de navegación activado por `TAB` y cerrado con `ESC`.
- Custom cursor sólo en desktop.
- Animaciones de entrada con Motion.
- Persistencia local del hint de teclado (`localStorage`).

## 5. Documentación por secciones del portafolio

### 5.1 Menú de navegación

#### Diseño

- Fondo oscuro sólido `#2C2416`.
- Borde estructural `#8B7355`.
- Iconos centrados, compactos y claros.
- Tooltips en escritorio para reforzar legibilidad.
- Navegación inferior en móvil para acceso rápido con pulgar.

#### Función

- Permite desplazarse entre todas las páginas principales del portafolio.
- Marca visualmente la sección activa.
- Permite alternar idioma desde el propio menú lateral.
- Mantiene coherencia entre escritorio y móvil usando la misma metadata de rutas.

### 5.2 Bienvenida / Hero con CV

#### Diseño

- Composición centrada con logo, foto de perfil y nombre completo.
- Gran jerarquía visual con `h1` dominante.
- Badge superior de “Portafolio Personal”.
- Botón principal de descarga con alto contraste.
- Indicador inferior con flecha animada para sugerir continuidad.

#### Elementos usados

- Logo adaptable según tema.
- Foto de perfil circular con borde fuerte.
- Título profesional corto.
- Descripción breve del perfil.
- Botón CTA para descarga del CV.

#### Función

- Presenta identidad visual y profesional del autor.
- Permite descargar el CV según idioma actual.
- Refuerza la marca personal desde el primer pantallazo.

#### Comportamiento funcional

- Si el idioma activo es español, descarga `CV_David_Luna.pdf`.
- Si el idioma activo es inglés, descarga `CV_David_Luna_English.pdf`.

### 5.3 Acerca de mí

#### Diseño

- Layout en dos columnas en escritorio.
- Imagen personal a la izquierda y contenido narrativo a la derecha.
- Tarjeta principal con fondo translúcido y borde estructural.
- Dos bloques destacados al final para resumir áreas de especialidad.

#### Elementos usados

- Imagen de perfil.
- Título de sección.
- Texto descriptivo dividido en varios párrafos.
- Tarjetas-resumen de habilidades: IA y desarrollo web / gestión de datos.

#### Función

- Explica el enfoque profesional del portafolio.
- Presenta la propuesta de valor del autor.
- Introduce el cruce entre desarrollo web, IA y gestión de datos.

### 5.4 Mis proyectos

#### Diseño

- Tarjetas apiladas en una sola columna para dar protagonismo a cada proyecto.
- Imagen o logotipo principal en un bloque superior.
- Descripción, tecnologías y botones de acción en la parte inferior.
- Etiquetas visuales para stack y categoría técnica.

#### Elementos usados

- Imagen representativa del proyecto.
- Título.
- Descripción bilingüe.
- Chips de tecnologías.
- Botón a GitHub.
- Botón a demo externa o video demo.

#### Función

- Mostrar proyectos reales con acceso directo a código y despliegue/demo.
- Evidenciar stack técnico y foco funcional.
- Servir como portafolio verificable para reclutadores o clientes.

#### Proyectos documentados actualmente

| Proyecto | GitHub | Demo |
| --- | --- | --- |
| TotalPaper | Sí | Video demo |
| TotalGrafic3D | Sí | Vercel |
| MuLi | Sí | Vercel |

Nota: la sección cumple con el requisito de enlaces a GitHub y Demo/Vercel. En el caso de `TotalPaper`, la salida pública implementada es un video demo.

### 5.5 Testimonios

#### Diseño

- Carrusel centrado con “peek” de tarjetas laterales.
- Tarjeta principal grande con cita destacada y datos del cliente.
- Ícono de comillas como ancla visual.
- Sistema de dots y contador de slide.
- En móvil se reduce el padding lateral para conservar foco.

#### Elementos usados

- Texto testimonial en formato cita.
- Nombre de cliente.
- Cargo y empresa.
- Calificación visual con estrellas.
- Navegación por carrusel.

#### Función

- Aportar credibilidad social al perfil.
- Mostrar satisfacción de clientes o colaboradores.
- Añadir ritmo visual a la navegación del portafolio.

#### Estado actual

- La implementación contiene 4 testimonios.
- Cumple el requisito de mínimo 3 testimonios.

### 5.6 Experiencia académica y laboral

#### Diseño

- Dos bloques principales: formación académica y habilidades técnicas.
- Tarjetas con estructura limpia, borde visible y separación generosa.
- Uso de iconos para distinguir categorías.

#### Elementos usados

- Formación académica.
- Estado de avance (`Cursando`, `Completado`).
- Descripción de enfoque formativo.
- Habilidades agrupadas por categoría.

#### Función

- Presentar base académica del perfil.
- Resumir capacidades técnicas por dominio.
- Comunicar madurez técnica de forma rápida.

#### Nota de alcance

La vista actual implementada se centra de forma explícita en experiencia académica y habilidades técnicas. Si se desea una línea laboral cronológica formal, puede ampliarse esta misma sección con experiencia profesional detallada.

### 5.7 Contactos

#### Diseño

- Tarjeta central única para facilitar lectura.
- Bloques de contacto con ícono a la izquierda y contenido a la derecha.
- Sección de disponibilidad al final con indicador visual activo.

#### Elementos usados

- Email personal.
- Email institucional.
- Teléfono / WhatsApp.
- Ubicación.
- Estado de disponibilidad.

#### Función

- Facilitar contacto inmediato desde distintos canales.
- Ofrecer un punto de cierre comercial claro.
- Reforzar disponibilidad para nuevos proyectos.

### 5.8 Pie de página

#### Diseño

- Fondo oscuro consistente con sidebar y botones primarios.
- Jerarquía simple en dos columnas sobre desktop.
- Línea divisoria superior para separar del contenido principal.

#### Elementos usados

- Nombre completo.
- Rol profesional resumido.
- Email.
- Teléfono.
- Línea de copyright.

#### Función

- Cerrar la experiencia con datos de contacto rápidos.
- Reforzar identidad personal y ubicación.
- Mantener persistencia visual de la marca del portafolio.

## 6. Componentes funcionales destacados

### Cambio de idioma

- Disponible desde el sidebar.
- Alterna entre español e inglés.
- Afecta textos de navegación, hero, secciones y archivos CV.

### Cambio de tema

- Botón flotante superior derecho.
- Alterna entre modo base y modo tatami.
- Ajusta fondo, acentos, contraste y algunos recursos gráficos.

### Menú circular

- Se abre con `TAB` en escritorio.
- Se cierra con `ESC`.
- Facilita acceso rápido a todas las secciones.
- Refuerza el carácter interactivo del portafolio.

### Cursor personalizado

- Activo únicamente en escritorio.
- Oculto en móvil para no afectar usabilidad táctil.

### Animaciones

- Entradas suaves en títulos, tarjetas y botones.
- Hover states en botones, chips y tarjetas.
- Carrusel animado en testimonios.

## 7. Estructura relevante del proyecto

```text
src/
  app/
    components/
      Layout.tsx
      Sidebar.tsx
      CircularMenu.tsx
      ThemeToggle.tsx
      Footer.tsx
      TabHint.tsx
      CustomCursor.tsx
      PageShell.tsx
    config/
      navigation.tsx
    contexts/
      ThemeContext.tsx
      LanguageContext.tsx
    pages/
      Home.tsx
      About.tsx
      Projects.tsx
      Testimonials.tsx
      Experience.tsx
      PersonalLife.tsx
      Contact.tsx
    routes.tsx
  styles/
    index.css
    theme.css
    slider.css
    cursor.css
```

## 8. Ejecución local

Instalar dependencias:

```bash
npm install
```

Iniciar entorno de desarrollo:

```bash
npm run dev
```

Generar build de producción:

```bash
npm run build
```

## 9. Resumen de valor del diseño

Este portafolio no está planteado como una galería genérica, sino como una interfaz de presentación profesional con identidad visual consistente. La combinación de tonos tierra, contraste alto, navegación estructurada y bloques claros de información permite que el contenido técnico se perciba ordenado, serio y fácil de recorrer.

La experiencia está diseñada para comunicar:

- identidad profesional,
- claridad en la propuesta de valor,
- evidencia de proyectos reales,
- respaldo social mediante testimonios,
- acceso directo a contacto y CV.
  