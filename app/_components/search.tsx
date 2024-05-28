"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) return;

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <>
      <div className="hidden w-full justify-center bg-primary px-5 md:flex">
        <div className="flex w-full max-w-7xl items-end justify-between">
          <div className="flex flex-col gap-3 py-32">
            <h2 className="text-5xl font-bold text-white">Está com fome?</h2>
            <p className="text-lg text-white">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você.
            </p>
            <form
              onSubmit={handleSearchSubmit}
              className="flex gap-2 rounded-xl bg-white p-6"
            >
              <Input
                placeholder="Buscar Restaurantes"
                onChange={handleSearch}
                value={search}
                className="border-none"
              />
              <Button size="icon" type="submit">
                <SearchIcon size={20} />
              </Button>
            </form>
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

      <form
        onSubmit={handleSearchSubmit}
        className="flex gap-2 rounded-xl bg-white p-6 md:hidden"
      >
        <Input
          placeholder="Buscar Restaurantes"
          onChange={handleSearch}
          value={search}
          className="border-none"
        />
        <Button size="icon" type="submit">
          <SearchIcon size={20} />
        </Button>
      </form>
    </>
  );
};

export default Search;
