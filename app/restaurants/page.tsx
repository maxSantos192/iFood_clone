import { Suspense } from "react";
import Restaurants from "./_components/restaurants";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

const RestaurantsPage = async () => {
  const session = await getServerSession(authOptions);
  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <Suspense>
      <Restaurants
        userFavoritesRestaurants={JSON.parse(
          JSON.stringify(userFavoritesRestaurants),
        )}
      />
    </Suspense>
  );
};

export default RestaurantsPage;
