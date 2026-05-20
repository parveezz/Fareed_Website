import { Toaster } from "react-hot-toast";
import Routing from "./Components/Routing/Routing";
import ScrollToTopButton from "./Components/shared/ScrollToTopButton";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routing />
      <ScrollToTopButton />
    </>
  );
};

export default App;