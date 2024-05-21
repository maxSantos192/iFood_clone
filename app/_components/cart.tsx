import { useContext, useState } from "react";
import { CartContext } from "../_contexts/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Image from "next/image";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { createOrder } from "../_actions/order";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const Cart = () => {
  const [isSubmitloading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { data } = useSession();
  const { products, totalPrice, totalDiscount, subtotalPrice, clearCart } =
    useContext(CartContext);

  const handleFinishOrder = async () => {
    if (!data?.user) return;
    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subtotalPrice,
        totalDiscount,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
      });

      clearCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
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
                      formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee),
                      )
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

            <Button
              disabled={isSubmitloading}
              onClick={() => setIsConfirmDialogOpen(true)}
              className="mt-6 w-full"
            >
              {isSubmitloading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar Pedido
            </Button>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-5">
            <span className="text-muted-foreground">
              Sua sacola está vazia!
            </span>
            <Image
              src={"/model-confused.png"}
              alt="Sacola vazia"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar o pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar o seu pedido você concorda com os termos e condições
              dessa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitloading}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrder}>
              {isSubmitloading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
