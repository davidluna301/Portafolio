import {
  Briefcase,
  type LucideIcon,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MessageSquare,
  Music,
  User,
} from "lucide-react";

type TranslationPair = {
  es: string;
  en: string;
};

export interface NavigationItem {
  path: string;
  icon: LucideIcon;
  label: TranslationPair;
}

export const navigationItems: NavigationItem[] = [
  { path: "/", icon: Home, label: { es: "Inicio", en: "Home" } },
  { path: "/about", icon: User, label: { es: "Acerca de mí", en: "About me" } },
  { path: "/projects", icon: Briefcase, label: { es: "Proyectos", en: "Projects" } },
  { path: "/testimonials", icon: MessageSquare, label: { es: "Testimonios", en: "Testimonials" } },
  { path: "/experience", icon: GraduationCap, label: { es: "Experiencia", en: "Experience" } },
  { path: "/personal", icon: Heart, label: { es: "Conóceme mejor", en: "Get to know me" } },
  { path: "/music", icon: Music, label: { es: "Musica", en: "Music" } },
  { path: "/contact", icon: Mail, label: { es: "Contacto", en: "Contact" } },
];

export function getNavigationLabel(
  item: NavigationItem,
  translate: (es: string, en: string) => string,
) {
  return translate(item.label.es, item.label.en);
}