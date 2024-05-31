import Image from "next/image";
import Search from "./search";

const HeroSection = () => {
  return (
    <div className="hidden w-full justify-center bg-primary md:flex">
      <div className="flex w-full max-w-7xl items-end justify-between px-5">
        <div className="flex flex-col gap-3 py-32">
          <h2 className="text-5xl font-bold text-white">Está com fome?</h2>
          <p className="text-lg text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>
          <Search className="bg-white p-6" />
        </div>
        <div className="relative hidden h-72 w-80 items-end md:flex">
          <Image
            src="/food-image.png"
            alt="Pizza"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
