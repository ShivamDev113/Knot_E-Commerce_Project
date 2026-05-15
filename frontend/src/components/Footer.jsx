import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-sm px-10 py-10">
      {/* Main container */}
      <div
        className="flex flex-col gap-9 items-center
                   sm:flex-row sm:flex-wrap sm:gap-16 sm:justify-between lg:gap-25"
      >
        {/* 1st block */}
        <div className="flex-1 min-w-[250px] text-center sm:text-left sm:px-4">
          <img
            src={assets.logo}
            className="mb-5 w-32 mx-auto sm:mx-0"
            alt="Knot Logo"
          />
          <p className="text-gray-700 leading-relaxed">
            Knot is more than just a clothing brand—it’s a community built on
            style, comfort, and confidence. Every piece we create is made to fit
            seamlessly into your lifestyle, helping you look good and feel even
            better. With designs that are versatile, modern, and loved by many,
            Knot makes fashion easy, fun, and truly yours.
          </p>
        </div>

        {/* 2nd block */}
        <div className="flex-1 min-w-[200px] text-center sm:text-left sm:px-4">
          <p className="text-2xl font-semibold mb-5">COMPANY</p>
          <div className="flex flex-col gap-2 text-gray-700">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/orders">DELIVERY</Link>
            <Link to="/contact">PRIVACY POLICY</Link>
          </div>
        </div>

        {/* 3rd block */}
        <div className="flex-1 min-w-[200px] text-center sm:text-left sm:px-4 ">
          <p className="text-2xl font-semibold mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-700">
            <li>+1-000-5000-2000</li>
            <li>knotclothing@gmail.com</li>
          </ul>
          <ul className="flex justify-center sm:justify-start gap-5 text-gray-700 mt-4">
            <li>
              <i className="fa-brands fa-instagram text-2xl"></i>
            </li>
            <li>
              <i className="fa-brands fa-facebook text-2xl"></i>
            </li>
            <li>
              <i className="fa-brands fa-amazon text-2xl"></i>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 text-gray-500 text-xs text-center border-t pt-4">
        © {new Date().getFullYear()} Knot Clothing. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
