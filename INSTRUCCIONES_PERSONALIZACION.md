# 📋 Instrucciones de Personalización - Portafolio David Luna

## ✅ Ya Personalizado

- ✓ Nombre completo: David Alejandro Luna Martinez
- ✓ Título profesional: Programador Web con IA
- ✓ Descripción profesional enfocada en IA y gestores de datos
- ✓ Foto de perfil integrada
- ✓ 3 proyectos reales (TotalPaper, TotalGrafic3D, MuLi)
- ✓ Información de contacto completa
- ✓ Formación académica: Técnico en Sistemas
- ✓ Habilidades técnicas organizadas
- ✓ Footer visible en todas las secciones
- ✓ Sin sección de redes sociales (según requerimiento)

## 📝 Pendiente de Personalizar (Opcional)

### 1. Archivo CV para Descarga

**Ubicación:** `/src/app/pages/Home.tsx` - línea 5-8

**Pasos:**
1. Sube tu CV en formato PDF a la carpeta `/public` de tu proyecto
2. Actualiza la función `handleDownloadCV`:

```typescript
const handleDownloadCV = () => {
  const link = document.createElement('a');
  link.href = '/tu-cv.pdf'; // Nombre de tu archivo PDF
  link.download = 'CV_David_Luna_Martinez.pdf';
  link.click();
};
```

### 2. Testimonios Reales

**Ubicación:** `/src/app/pages/Testimonials.tsx` - línea 8-45

**Pasos:**
1. Reemplaza los testimonios de ejemplo con testimonios reales de clientes/colaboradores
2. Actualiza las fotos usando Unsplash o fotos reales:

```typescript
const testimonials = [
  {
    id: 1,
    name: "Nombre del Cliente",
    position: "Cargo",
    company: "Empresa",
    text: "Testimonio real...",
    image: "URL_de_la_imagen",
    rating: 5,
  },
  // Añade más testimonios...
];
```

### 3. Imágenes en "Acerca de mí"

**Ubicación:** `/src/app/pages/About.tsx` - línea 8-20

Actualmente usa tu foto de perfil estática. Si deseas un slider de imágenes:
- Cambia la línea 69-79 para usar el slider original
- Actualiza las URLs de las imágenes con fotos tuyas reales

### 4. Formulario de Contacto Funcional

**Ubicación:** `/src/app/pages/Contact.tsx` - línea 15-24

Para hacer el formulario funcional:
1. Configura un servicio de backend (EmailJS, Formspree, etc.)
2. O usa tu propio servidor
3. Reemplaza la función `handleSubmit` con la integración real

Ejemplo con EmailJS:
```bash
npm install @emailjs/browser
```

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
    .then(() => {
      alert('¡Mensaje enviado!');
      setFormData({ name: "", email: "", subject: "", message: "" });
    });
};
```

## 🚀 Deployment en Vercel

1. Sube tu código a GitHub
2. Conecta tu repositorio con Vercel
3. Configura:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

## 🎨 Personalización de Colores

**Ubicación:** `/src/styles/theme.css`

Paleta actual (Tatami Japonés):
- Fondo: `#F5F1E8` (Beige claro)
- Oscuro: `#2C2416` (Marrón oscuro)
- Medio: `#8B7355` (Marrón medio)
- Acento: `#C4A57B` (Dorado/beige)

## 📱 Características Implementadas

- ✅ Diseño responsive (desktop y mobile)
- ✅ Sidebar de navegación estático
- ✅ Footer siempre visible
- ✅ Menú circular activado con TAB (solo desktop)
- ✅ Animaciones suaves con Motion
- ✅ 6 secciones completas
- ✅ Estética japonesa (tatami) minimalista
- ✅ React Router para navegación

## 🔧 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📞 Contacto en el Portafolio

- Personal: davidalejandrolunam@hotmail.com
- WhatsApp: +57 318 435 1819
- Ubicación: Colombia, Nariño

---

**Nota:** Todos los contenidos están listos para uso. Solo necesitas personalizar el CV descargable, los testimonios (opcional) y configurar el formulario de contacto si deseas que sea funcional.
