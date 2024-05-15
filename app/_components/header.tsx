import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <div className="relative h-[40px] w-[80px]">
        <Link href={"/"}>
          <Image src="/logo.png" alt="iFood logo" fill />
        </Link>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
