import { useContext } from "react";
import { CartContext } from "../_contexts/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Image from "next/image";

const Cart = () => {
  const { products, totalPrice, totalDiscount, subtotalPrice } =
    useContext(CartContext);

  return (
    <div className="flex h-full flex-col py-5">
      <div className="flex-auto space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      {products.length > 0 ? (
        <>
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>
                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>

                  {Number(products[0].restaurant.deliveryFee) > 0 ? (
                    formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                  ) : (
                    <span className="uppercase text-primary ">Grátis</span>
                  )}
                </div>
                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Desconto</span>
                  <span>- {formatCurrency(totalDiscount)}</span>
                </div>
                <Separator />

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button className="mt-6 w-full">Finalizar Pedido</Button>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-5">
          <span className="text-muted-foreground">Sua sacola está vazia!</span>
          <Image
            src={"/model-confused.png"}
            alt="Sacola vazia"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
