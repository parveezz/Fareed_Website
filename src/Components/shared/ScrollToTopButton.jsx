import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
      const scrollToTop = () => {
            window.scrollTo({
                  top: 0,
                  behavior: "smooth",
            });
      };

      return (
            <button
                  onClick={scrollToTop}
                  className="fixed bottom-6 right-6 bg-zinc-800 text-white p-4 rounded-full shadow-lg hover:bg-zinc-700 transition-all duration-300 z-50"
            >
                  <ArrowUp size={24} />
            </button>
      );
};

export default ScrollToTopButton;