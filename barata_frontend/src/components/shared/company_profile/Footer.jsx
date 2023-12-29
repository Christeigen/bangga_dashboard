import React from 'react'
import unair from '/src/assets/UNAIR.png'
import ftmm from '/src/assets/FTMM.png'
import kedaireka from '/src/assets/KEDAI REKA.png'
import barata from '/src/assets/barata.png'
import km from '/src/assets/KAMPUS MERDEKA.png'
import styles from '/src/style.js';
import { footerLinks } from "/src/constants/index";
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col bg-blue-950`}>
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10 mx-20">
          {footerLinks.map((footerlink) => (
            <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
              <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  console.log("link", link),
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[14px] leading-[24px] text-gray-50 hover:text-yellow-500 cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                      }`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='mb-8 px-20 justify-center'>
        <h1 className='font-poppins font-medium text-[14px] leading-[27px] text-white pb-4 text-center'>Supported by</h1>
        <div className='flex h-6 gap-6'>
          <img src={ftmm} />
          <img src={unair} />
          <img src={barata} />
          <img src={kedaireka} />
          <img src={km} />
        </div>
      </div>

      <div className="w-full flex justify-center items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45] mx-20 ">
        <p className="font-poppins font-normal text-center text-[12px] leading-[27px] text-white mx-20">
          Copyright Ⓒ 2023 Bangga. All Rights Reserved.
        </p>

        {/* <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social, index) => (
            <img
              key={social.id}
              src={social.icon}
              alt={social.id}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
              onClick={() => window.open(social.link)}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};