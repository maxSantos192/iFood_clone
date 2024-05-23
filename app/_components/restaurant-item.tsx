"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { useSession } from "next-auth/react";
import { isRestaurantFavorited } from "../_helpers/restaurant";
import useToggleFavoriteRestaurant from "../_hooks/use-toggle-favorite-restaurant";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  userFavoritesRestaurants: UserFavoriteRestaurant[];
}

const RestaurantItem = ({
  restaurant,
  className,
  userFavoritesRestaurants,
}: RestaurantItemProps) => {
  const { data } = useSession();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoritesRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  });

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="relative h-[136px] w-full">
        <Link href={`/restaurants/${restaurant.id}`}>
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover"
          />
        </Link>

        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px]">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>

        {data?.user.id && (
          <Button
            size="icon"
            onClick={handleFavoriteClick}
            className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
          >
            <HeartIcon size={12} className="fill-white" />
          </Button>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>

        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <TimerIcon size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
