import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import RestaurantItem from "../_components/restaurant-item";
import EmptyItem from "../_components/empty-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {userFavoritesRestaurants.length > 0 ? (
            userFavoritesRestaurants.map(({ restaurant }) => (
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
            <div className="flex h-full flex-col items-center justify-center space-y-5">
              <EmptyItem
                textInformation={
                  "Você ainda não possui restaurantes favoritos."
                }
                altImage={"Lista de restaurantes favoritos vazia."}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
