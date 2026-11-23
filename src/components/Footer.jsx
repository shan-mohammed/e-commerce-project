import React from 'react'

import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-teal-400 mb-4">
              WE<span className="text-white mb-4">SHOP</span>
            </h2>

            <p className="text-sm leading-7 text-gray-400">
              Your one-stop destination for quality products at
              affordable prices. Shop smart, shop easy, and enjoy
              a seamless shopping experience.
            </p>

            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Facebook" className="hover:text-teal-400 transition">
                <FaFacebookF size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-teal-400 transition">
                <FaInstagram size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-teal-400 transition">
                <FaTwitter size={18} />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-teal-400 transition">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-teal-400 transition">Products</Link></li>
              <li><Link to="/wishlist" className="hover:text-teal-400 transition">Wishlist</Link></li>
              <li><Link to="/compare" className="hover:text-teal-400 transition">Compare Products</Link></li>
              <li><Link to="/profile" className="hover:text-teal-400 transition">My Account</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Customer Support
            </h3>

            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-teal-400 transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-teal-400 transition">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-teal-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-teal-400 transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Get in Touch
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-teal-400 mt-1" />
                <span>Kerala, India</span>
              </li>

              <li className="flex items-center gap-3">
                <FaPhone className="text-teal-400" />
                <span>+91 XXXXX XXXXX</span>
              </li>

              <li className="flex items-center gap-3">
                <FaEnvelope className="text-teal-400" />
                <span>support@weshop.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()} WESHOP. All rights reserved.
          </p>


        </div>
      </div>

    </footer>
  );
};

export default Footer;