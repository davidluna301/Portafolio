import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Testimonials } from "./pages/Testimonials";
import { Experience } from "./pages/Experience";
import { Contact } from "./pages/Contact";
import { PersonalLife } from "./pages/PersonalLife";
import { Process } from "./pages/Process";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "projects", Component: Projects },
      { path: "testimonials", Component: Testimonials },
      { path: "experience", Component: Experience },
      { path: "personal", Component: PersonalLife },
      { path: "process", Component: Process },
      { path: "contact", Component: Contact },
    ],
  },
]);
