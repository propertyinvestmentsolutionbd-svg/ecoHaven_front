"use client";
import CommonPage from "@/components/common/CommonPage";
import Image from "next/image";
import React from "react";
import "./contact.css";
import { Form, Input, Button, message } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

export default function Contact() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Form submitted successfully!");
    form.resetFields();
  };
  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps?q=40.71274377933185,-74.00594908459418",
      "_blank"
    );
  };

  return (
    <CommonPage>
      <section className="contact-image-container">
        <Image
          src="/contact.png" // replace with your actual image path
          alt="About Us Background"
          fill
          //   width={100}
          //   height={100}
          priority
          //   className="about-image"
          style={{
            objectFit: "cover",
          }}
        />
        <div className="about-overlay"></div>
        <h1 className="about-title">Contact Us</h1>
        <div className="scroll-indicator">
          <div className="triangle"></div>
        </div>{" "}
      </section>
      <section className="contact-form-container">
        <div className="contact-info-section">
          <h2 className="company-title">Eco Haven Ltd.</h2>

          <div className="info-row">
            <span className="info-label">Enquiries (24x7)</span>
            <span className="info-value">: 16769 (Sales), eda (Land)</span>
          </div>

          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">: ecohaven@gmail.com</span>
          </div>

          <div className="info-row">
            <span className="info-label">General Enquiries</span>
            <span className="info-value">: +8802xxxxxx, +18xxxxx</span>
          </div>

          <div className="info-row">
            <span className="info-label">Corporate Office</span>
            <span className="info-value">: House-15, Road-13/A, Jalshiri,</span>
          </div>

          <div className="info-row">
            <span className="info-label">Business Center</span>
            <span className="info-value">: House-15B, Road-16 (Old-27),</span>
          </div>

          <div className="info-row">
            <span className="info-label">Project Operations</span>
            <span className="info-value">: House-29/A, Road-11 (Old-32),</span>
          </div>

          <div className="info-row">
            <span className="info-label">Admin Office</span>
            <span className="info-value">: House-2D,</span>
          </div>

          <div className="info-row">
            <span className="info-label">Open Hours</span>
            <div className="info-value">
              <div>: Saturday - Thursday</div>
              <div className="hours-indent">(09:00 AM - 06:00 PM)</div>
              <div className="hours-indent">Friday (Only Sales)</div>
              <div className="hours-indent">(09:00 AM - 06:00 PM)</div>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="contact-form"
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please enter your name" },
                { max: 100, message: "Name must be less than 100 characters" },
              ]}
            >
              <Input placeholder="Your Name" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
                { max: 255, message: "Email must be less than 255 characters" },
              ]}
            >
              <Input placeholder="Your Email" size="large" />
            </Form.Item>

            <Form.Item
              name="message"
              rules={[
                { required: true, message: "Please enter your message" },
                {
                  max: 1000,
                  message: "Message must be less than 1000 characters",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Your Message"
                rows={4}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="submit-button"
                block
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
      {/* Company Name */}
      <section className="contact-map">
        <div
          className="company-name"
          style={{ textAlign: "center", margin: "3rem" }}
        >
          Office Location
        </div>
        <div className="full-width-map">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25313.551081338017!2d90.34815775786113!3d23.839401774675263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1000038396f%3A0x576a62bf370ec5f!2sEco%20Haven%20Limited!5e0!3m2!1sen!2sbd!4v1760734829326!5m2!1sen!2sbd"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Digitmark Creative Location"
            />

            {/* Map Overlay */}
            <div className="map-overlay" onClick={openGoogleMaps}>
              <div className="overlay-content">
                <EnvironmentOutlined className="pin-icon" />
                <span className="overlay-text">Click here to view on map</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CommonPage>
  );
}
