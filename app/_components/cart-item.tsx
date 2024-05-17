import { CartContext, CartProduct } from "../_contexts/cart";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleIncreaseProductQuantity = () =>
    increaseProductQuantity(cartProduct.id);

  const handleDecreaseProductQuantity = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleRemoveProductFromCart = () =>
    removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(cartProduct.price))}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              size={"icon"}
              variant="ghost"
              onClick={handleDecreaseProductQuantity}
              className="h-8 w-8 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="block w-3 text-xs">{cartProduct.quantity}</span>
            <Button
              size={"icon"}
              onClick={handleIncreaseProductQuantity}
              className="h-8 w-8"
            >
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size={"icon"}
        variant="ghost"
        onClick={handleRemoveProductFromCart}
        className="h-8 w-8 border border-solid border-muted-foreground"
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
