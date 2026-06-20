import { useEffect } from "react";
import Footer from "../../shared/Footer"
import TestimonialSection from "../../shared/TestimonialSection"
import ConsultationSection from "./ConsultationSection"
import CorePanelSystems from "./CorePanelSystems"
import Hero from "./Hero"


const Home = () => {
      useEffect(() => {
            document.title = "Fareed Electricals | Panel Construction & Repairs Specialist";
      }, []);

      return (
            <>
                  <Hero />
                  <CorePanelSystems />
                  <ConsultationSection />
                  <TestimonialSection />
                  <Footer />
            </>
      )
}

export default Home