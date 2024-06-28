import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetail from "./_components/product-detail";
import ProductComplementary from "./_components/product-complementary";
import { Card } from "@/app/_components/ui/card";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const Productpage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="md:flex md:space-x-5 md:px-5">
        <div className="w-full md:flex-1">
          <ProductImage product={JSON.parse(JSON.stringify(product))} />
        </div>
        <Card className="w-full border-none shadow-none md:flex-1 md:border-solid md:shadow">
          <ProductDetail product={JSON.parse(JSON.stringify(product))} />
        </Card>
      </div>
      <div className="mt-6 space-y-3">
        <ProductComplementary
          productComplementary={JSON.parse(JSON.stringify(juices))}
        />
      </div>
    </div>
  );
};

export default Productpage;
