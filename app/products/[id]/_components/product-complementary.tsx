import ProductList from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";

interface ComplementaryProductProps {
  productComplementary: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductComplementary = ({
  productComplementary,
}: ComplementaryProductProps) => {
  return (
    <div className="mt-6 space-y-3">
      <h3 className="px-5 font-semibold">Sucos</h3>
      <ProductList products={productComplementary} />
    </div>
  );
};

export default ProductComplementary;
