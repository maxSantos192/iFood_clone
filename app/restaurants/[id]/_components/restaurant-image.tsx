"use client";

import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorited } from "@/app/_helpers/restaurant";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantsImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoritesRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  userFavoritesRestaurants,
}: RestaurantsImageProps) => {
  const { data } = useSession();
  const router = useRouter();
  const handleBackClick = () => router.back();

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
    <div className="relative h-[250px] w-full md:h-[350px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover md:rounded-lg"
      />
      <Button
        className="absolute left-4 top-4 rounded-full border border-solid border-muted-foreground bg-white text-foreground hover:text-white md:hidden"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        onClick={handleFavoriteClick}
        className={`absolute right-4 top-4 rounded-full bg-gray-700 md:hidden ${isFavorite && "bg-primary hover:bg-gray-700"}`}
      >
        <HeartIcon size={22} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
