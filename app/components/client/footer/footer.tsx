import React from "react";

const Footer = () => {
  return (
    <div className="mt-8 text-center p-4 bg-[#A8A8A75E] h-[50vh]">
      <h3 className="text-xl font-bold text-blue-900 mb-4">
        TERHUBUNG DENGAN KAMI :
      </h3>
      <div className="flex justify-center h-48  space-x-8">
        <div className="flex items-center">
          <img
            src="/path/to/phone-icon.png"
            alt="Phone"
            className="w-6 h-6 mr-2"
          />
          <span>(0986) 214245</span>
        </div>
        <div className="flex items-center">
          <img
            src="/path/to/email-icon.png"
            alt="Email"
            className="w-6 h-6 mr-2"
          />
          <span>prodi.s1informatika@unipa.ac.id</span>
        </div>
        <div className="flex items-center">
          <img
            src="/path/to/instagram-icon.png"
            alt="Instagram"
            className="w-6 h-6 mr-2"
          />
          <span>@teknik_informatika_unipa</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
