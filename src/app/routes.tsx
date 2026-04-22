import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Testimonials } from "./pages/Testimonials";
import { Experience } from "./pages/Experience";
import { Contact } from "./pages/Contact";
import { PersonalLife } from "./pages/PersonalLife";
import { Music } from "./pages/Music";

const appChildren = [
  { index: true, Component: Home },
  { path: "about", Component: About },
  { path: "projects", Component: Projects },
  { path: "testimonials", Component: Testimonials },
  { path: "experience", Component: Experience },
  { path: "personal", Component: PersonalLife },
  { path: "music", Component: Music },
  { path: "contact", Component: Contact },
];

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: appChildren,
  },
  {
    path: "/Portafolio",
    Component: Layout,
    children: appChildren,
  },
]);
