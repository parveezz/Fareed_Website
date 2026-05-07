import Footer from "../../shared/Footer"
import Testimonials from "../../shared/testimonials"
import ConsultationSection from "./ConsultationSection"
import CorePanelSystems from "./CorePanelSystems"
import Hero from "./Hero"


const Home = () => {
      return (
            <>
                  <Hero />
                  <CorePanelSystems />
                  <ConsultationSection />
                  <Testimonials />
                  <Footer />
            </>
      )
}

export default Home