import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import RestaurantInfo from "./_components/restaurant-info";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            take: 10,
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const session = await getServerSession(authOptions);
  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div className="mx-auto w-full max-w-7xl md:px-5">
      <div className="justify-center gap-4 md:flex">
        <RestaurantImage
          restaurant={JSON.parse(JSON.stringify(restaurant))}
          userFavoritesRestaurants={userFavoritesRestaurants}
        />

        <RestaurantInfo restaurant={JSON.parse(JSON.stringify(restaurant))} />
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div key={category.id} className="mt-6 space-y-4">
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}

      <CartBanner restaurant={JSON.parse(JSON.stringify(restaurant))} />
    </div>
  );
};

export default RestaurantPage;
