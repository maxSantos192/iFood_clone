import ProductItem from "@/app/_components/product-item";
import RestaurantList from "@/app/_components/restaurant-list";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        take: 12,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
      restaurants: {
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl py-6">
        <h2 className="mb-6 px-5 text-lg font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6 px-5 md:grid-cols-4 lg:grid-cols-6">
          {category?.products.map((product) => (
            <ProductItem
              key={category.id}
              product={JSON.parse(JSON.stringify(product))}
              className="min-w-full"
            />
          ))}
        </div>
        <h2 className="px-5 py-6 text-lg font-semibold">Restaurantes</h2>
        <div>
          <RestaurantList />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
