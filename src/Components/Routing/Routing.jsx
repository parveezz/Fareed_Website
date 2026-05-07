import { Routes, Route } from "react-router-dom";
import Layout from "../shared/Layout";
import Home from "../Pages/Home"
import Work from "../Pages/Work"
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Services from "../Pages/Services";

const Routing = () => {
      return (
            <Routes>
                  <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="work" element={<Work />} />
                        <Route path="about" element={<About />} />
                        <Route path="services" element={<Services />} />
                        <Route path="contact" element={<Contact />} />
                  </Route>
            </Routes>
      );
};

export default Routing;