"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import RestaurantItem from "@/app/_components/restaurant-item";
import EmptyItem from "@/app/_components/empty-item";

interface RestaurantProps {
  userFavoritesRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoritesRestaurants }: RestaurantProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchParams = useSearchParams();

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);

      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex flex-col gap-6">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={JSON.parse(JSON.stringify(restaurant))}
                userFavoritesRestaurants={JSON.parse(
                  JSON.stringify(userFavoritesRestaurants),
                )}
                className="min-w-full max-w-full"
              />
            ))
          ) : (
            <div className="flex flex-col items-center">
              <EmptyItem
                textInformation="Nenhum restaurante encontrado!"
                altImage="Nenhum restaurante encontrado."
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
