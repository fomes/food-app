import { memo, useContext } from "react";

import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";

import Image from "next/image";

import { Button } from "./ui/button";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);

  const handleRemoveClick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* IMAGEM E INFO */}
        <div className="relative h-20 w-20">
          <Image
            fill
            sizes="100%"
            alt={cartProduct.name}
            src={cartProduct.imageUrl}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          {/* QUANTIDADE */}

          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
            >
              <MinusIcon size={16} onClick={handleDecreaseQuantityClick} />
            </Button>
            <span className="block w-3 text-xs">{cartProduct.quantity}</span>
            <Button
              size="icon"
              className="h-7 w-7"
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* BOTÃO DE DELETAR */}
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 border border-solid border-muted-foreground"
        onClick={handleRemoveClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default memo(CartItem, (prev, next) => {
  return prev.cartProduct.quantity === next.cartProduct.quantity;
});
