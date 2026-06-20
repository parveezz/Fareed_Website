import { Routes, Route } from "react-router-dom";
import Layout from "../shared/Layout";
import Home from "../Pages/Home/Home"
import Work from "../Pages/Work"
import ProjectDetails from "../Pages/ProjectDetails";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Services from "../Pages/Services";
import Admin from "../Pages/Admin";

const Routing = () => {
      return (
            <Routes>
                  <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="work" element={<Work />} />
                        <Route path="work/:id" element={<ProjectDetails />} />
                        <Route path="about" element={<About />} />
                        <Route path="services" element={<Services />} />
                        <Route path="services/:serviceId" element={<Services />} />
                        <Route path="contact" element={<Contact />} />
                  </Route>
                  <Route path="admin" element={<Admin />} />
            </Routes>
      );
};

export default Routing;