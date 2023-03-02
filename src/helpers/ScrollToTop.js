import { useEffect } from "react";

function ScrollToTopOnMount() {
    useEffect(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 150);
    }, []);
  
    return null;
  }

  export default ScrollToTopOnMount;