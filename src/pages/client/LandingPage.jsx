import React from "react";
import "../../styles/landing.css";

import { Link } from "react-router-dom";
import Waves from "../../component/Waves";

const LandingPage = () => {
  return (
    <div className="landing">
      <section className="hero">
        <h2>Welcome to Ocean Chat</h2>
        <Link to="/login">
          <button className="btn-login">Login</button>
        </Link>
      </section>

      <section className="info-section">
        <h2>Explore the Wonders of the Ocean</h2>
        <p>
          The ocean covers over 70% of our planet’s surface and is home to an
          incredible diversity of life. From the smallest plankton to the largest
          whales, the ocean’s ecosystem is a complex and interconnected web.
          Discover fascinating facts, current research, and the importance of
          preserving our blue planet.
        </p>
      </section>

      {/* Add the Waves at the bottom */}
      <Waves />
    </div>
  );
};

export default LandingPage;
