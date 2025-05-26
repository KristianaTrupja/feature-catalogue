import React from "react";
import Link from "next/link";
import { ArrowIcon, Logo } from "../../lib/icons";
import { Button } from "@/app/components/ui/button";
const Header = () => {
  return (
    <header className="w-full bg-white px-4 py-3 shadow-md relative z-40">
      <div className="container flex justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Button>
          <Link href={"https://canvasreply.de/en/pages/career"} className="flex items-center gap-1">
            <span>Join our team</span>
            <ArrowIcon />
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
