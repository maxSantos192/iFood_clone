import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetail from "./_components/product-detail";
import ProductComplementary from "./_components/product-complementary";

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
    <div>
      <ProductImage product={JSON.parse(JSON.stringify(product))} />
      <ProductDetail product={JSON.parse(JSON.stringify(product))} />
      <ProductComplementary
        productComplementary={JSON.parse(JSON.stringify(juices))}
      />
    </div>
  );
};

export default Productpage;
