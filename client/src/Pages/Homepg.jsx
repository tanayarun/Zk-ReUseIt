"use client";
import { motion } from "framer-motion";
import React from "react";
import AuroraBackground from "../Components/UI/Aurora-background.jsx";
import { NavLink } from "react-router-dom";
import logo from "../assets/push.svg";
import  HoverBorderGradient  from "../Components/UI/Hover-border-gradient.jsx"

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-5 items-center justify-center px-5 mb-8"
      >
        <img className="w-[80px]" src={logo} alt="" />
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
          Zk-ReUseIt
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          officiis quisquam
        </div>
        <div className="flex justify-center text-center">
          <NavLink to="/app">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-white flex items-center space-x-2 px-8 "
            >
              <span className="text-lg">Start</span>
            </HoverBorderGradient>
          </NavLink>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default AuroraBackgroundDemo;
