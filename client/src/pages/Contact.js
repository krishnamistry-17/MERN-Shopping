/** @format */

import React from "react";
import "./css/Contact.css";
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";

const Contact = () => {
  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between ">
              {/*phone number*/}

              <div className="contact_info_content">
                <FaPhone />
                <div className="contact_info_title">Phone</div>
                <div className="contact_info_text">+91 1234567891</div>
              </div>

              {/*Email*/}

              <div className="contact_info_content">
                <MdOutlineEmail />
                <div className="contact_info_title">Email</div>
                <div className="contact_info_text">
                  krishnamistry172003@gmail.com
                </div>
              </div>
              {/*Address*/}

              <div className="contact_info_content">
                <FaRegAddressCard />
                <div className="contact_info_title">Address</div>
                <div className="contact_info_text">Surat-Katargam</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Contact us form*/}
      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get in Touch</div>
                <form id="contact_form">
                  <div className="contact_form-name d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact_form_name"
                      className="contact_form_name input_field"
                      placeholder="Your Name"
                      required="true"
                    />
                    <input
                      type="email"
                      id="contact_form_email"
                      className="contact_form_email input_field"
                      placeholder="Your Email"
                      required="true"
                    />
                    <input
                      type="number"
                      id="contact_form_phone"
                      className="contact_form_phone input_field"
                      placeholder="Your Name"
                      required="true"
                    />
                  </div>
                  <div className="contact_form_text mt-3">
                    <textarea
                      className="text_field contact_form_message"
                      placeholder="Message"
                      cols="10"
                      rows="10"></textarea>
                  </div>
                  <div className="contact_form_button">
                    <button
                      type="submit"
                      className="button contact_submit_button">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
