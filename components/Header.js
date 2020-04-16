import React from "react";
import Link from "next/link";

const NavLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="p-2 hover:underline hover:text-red-800">{children}</a>
    </Link>
  );
};

const Header = () => {
  return (
    <div className="bg-gray-200 ">
      <h1>
        <NavLink href="/">
          <img src="/logo.png" alt="Logo" className="h-24 py-4 mx-auto" />
        </NavLink>
      </h1>
      <div className="bg-gray-500 py-4 text-center">
        <NavLink href="/sobre">Sobre</NavLink>
        <NavLink href="/cadastro">Cadastro</NavLink>
        <NavLink href="/entrar">Entrar</NavLink>
      </div>
    </div>
  );
};

export default Header;
