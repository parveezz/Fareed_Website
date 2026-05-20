import Footer from "../../shared/Footer"
import TestimonialSection from "../../shared/TestimonialSection"
import ConsultationSection from "./ConsultationSection"
import CorePanelSystems from "./CorePanelSystems"
import Hero from "./Hero"


const Home = () => {
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