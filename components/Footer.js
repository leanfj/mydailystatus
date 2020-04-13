import React from "react";

const Footer = () => {
  return (
    <div className="text-center bg-gray-500 p-2">
      MyDailyStatus é um projeto criado durante o FullStackLab do DevPleno
      <br />
      Implementado por:{" "}
      <a
        className="hover:underline hover:text-red-800"
        href="https://github.com/leanfj"
      >
        Leandro Ferreira
      </a>
    </div>
  );
};

export default Footer;
