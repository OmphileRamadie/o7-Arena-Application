import React from "react";
import arena from "../images/arena1.jpg";
import map from "../images/map.png";
import covid from "../images/covid2.jpg";

export default function Landing() {
  return (
    <div className="landing">
      <div className=" heroText">
        <h1 className="wlcm-text one">The o7 </h1>
        <h1 className="wlcm-text two">Welcomes </h1>
        <h1 className="wlcm-text three">You </h1>
      </div>
      <img src={arena} alt="o7 Arena" className="o7Arena" />

      <img src={covid} alt="covid 19" className="covidImage" />
      <div className="covidInfo">
        <h1>Upcoming Event Status Update</h1>
        <p>
          We at o7 Arena miss you and look forward to having you back. And when
          it comes time to reopen our doors, we want you to know that we are
          working with government and public health officials to ensure we
          continue to set the industry standard for safe and enjoyable
          experiences.
        </p>
      </div>

      <div className="contact">
        <h1 cl>Get In Touch</h1>
        <ul className="listOfContacts">
          <li>Email: o7Arena@events.com</li>
          <li>Phone: +27 11 507 4522</li>
          <li>Twitter: o7 Arena</li>
          <li>Facebook: o7 Arena</li>
          <li>Instagram: o7 Arena</li>
        </ul>
      </div>
      <div className="contact-form">
        <form>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Type your message here..."></textarea>
          <div className="submitBtn">
            <button>Submit</button>
          </div>
        </form>
      </div>
      <img src={map} alt="o7 Arena" className="map" />
      <div className="location">
        <h1>Location</h1>

        <p>Northumberland Rd and Olievenhout Ave</p>
        <p> North Riding</p>
        <p> Johannesburg</p>
        <p>2161</p>
      </div>
    </div>
  );
}
