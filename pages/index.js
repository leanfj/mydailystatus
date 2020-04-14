import React from "react";

const Index = () => {
  return (
    <div>
      <p className="text-center text-4xl my-20 font max-w-md mx-auto">
        Veja como as pessoas ao seu redor estão
      </p>
      <a
        href="/api/login"
        className="mx-auto w-1/4 block text-center py-4 px-2 rounded font-bold bg-pink-800 text-white shadow"
      >
        Começe por aqui
      </a>
    </div>
  );
};

export default Index;
