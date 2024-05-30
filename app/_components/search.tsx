"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "../_lib/utils";

interface SearchProps {
  className?: string;
}

const Search = ({ className }: SearchProps) => {
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
    <form
      onSubmit={handleSearchSubmit}
      className={cn("flex gap-2 rounded-xl bg-white p-6", className)}
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
  );
};

export default Search;
