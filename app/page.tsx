import CategoryList from "./_components/category-list";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import HeroSection from "./_components/hero-section";
import Search from "./_components/search";

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguerCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzaCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguerCategory, pizzaCategory] = await Promise.all([
    getProducts,
    getBurguerCategory,
    getPizzaCategory,
  ]);

  return {
    products,
    burguerCategory,
    pizzaCategory,
  };
};

const Home = async () => {
  const { products, burguerCategory, pizzaCategory } = await fetch();

  return (
    <>
      <div>
        <HeroSection />
        <Search className="px-5 md:hidden" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pt-6">
        <CategoryList />
      </div>

      <div className="mx-auto w-full max-w-7xl auto-rows-auto md:grid md:grid-cols-2">
        <div className="flex h-full px-5 pt-6 md:col-start-1 md:row-start-2">
          <Link
            href={`/categories/${pizzaCategory?.id}/products`}
            className="h-full w-full"
          >
            <PromoBanner
              src="/promo-banner.png"
              alt="Até 30% de desconto em pizzas"
            />
          </Link>
        </div>

        <div className="flex h-full flex-col space-y-4 pt-6 md:col-span-2 md:col-start-1 md:row-start-1">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold">Pedidos recomendados</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href={"/products/recommended"}>
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <ProductList products={products} />
        </div>

        <div className="flex h-full px-5 pt-6 md:row-start-2">
          <Link
            href={`/categories/${burguerCategory?.id}/products`}
            className="h-full w-full"
          >
            <PromoBanner
              src="/promo-banner-02.png"
              alt="Lanches a partir de R$17,90"
            />
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href={"/restaurants/recommended"}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
