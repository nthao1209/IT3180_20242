// app/(home)/components/header.tsx

"use client";

import React from "react";
import Logo from "./logo";
import SearchBar from "./search-bar";

function Header() {
  return (
    <>
      <header className="py-2 lg:py-4 container mx-auto">
        {/* Mobile */}
        <div className="flex sm:hidden flex-col justify-between p-2">
          <div className="flex items-center">
            <Logo />
          </div>
          <SearchBar />
        </div>

        {/* Desktop */}
        <div className="hidden sm:flex items-center justify-between">
          <Logo />
          <SearchBar />
        </div>
      </header>
    </>
  );
}

export default Header;
