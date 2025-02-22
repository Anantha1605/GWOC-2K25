"use client";

import { FC, ReactNode, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/src/context/CartContext";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface Props {
  visible?: boolean;
  onRequestClose?: () => void;
  children?: ReactNode;
}

const SideCart: FC<Props> = ({ visible, onRequestClose, children }) => {
  const { cart, removeFromCart } = useCart();
  const [showBookingMessage, setShowBookingMessage] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // New checkout logic:
  // If the user is not logged in, redirect to login with query parameters 
  // to ensure that after logging in the cart remains open and they are taken to order summary.
  // If logged in, redirect directly to order summary.
  const handleCheckout = () => {
    if (!session?.user) {
      router.push("/login?redirect=/order-summary");
    } else {
      router.push("/order-summary");
    }
  };

  // Calculate subtotal ensuring numerical addition
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.service.price),
    0
  );

  const isBookDisabled = cart.length === 0;

  return (
    <>
      <Sheet open={visible} onOpenChange={() => onRequestClose?.()}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent
          side="right"
          className="bg-white p-6 rounded-lg shadow-md overflow-auto w-96 min-h-screen flex flex-col z-50"
        >
          <SheetHeader>
            <SheetTitle className="text-gray-900 text-2xl font-bold">
              Cart
            </SheetTitle>
            <SheetDescription className="text-gray-700">
              Your selected items
            </SheetDescription>
          </SheetHeader>

          {/* Cart Items */}
          <div className="flex flex-col gap-4 mt-6">
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="border p-4 rounded bg-gray-50">
                  <h3 className="font-semibold text-gray-800">
                    {item.service.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Date: {item.date.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">Time: {item.time}</p>
                  <p className="text-sm text-gray-600">
                    Price: ₹{item.service.price}
                  </p>
                  <button
                    className="text-red-500 text-xs mt-2 hover:underline"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal, Checkout, and Close */}
          <SheetFooter className="mt-auto">
            <div className="py-4">
              <h1 className="font-semibold text-xl uppercase text-gray-800">
                Subtotal
              </h1>
              <p className="font-semibold text-gray-700">₹{subtotal}</p>
            </div>

            {/* Close Button */}
            <SheetClose asChild>
              <Button
                onClick={onRequestClose}
                className="outline-none block mt-4 text-center w-full uppercase border border-gray-300 text-gray-500 hover:bg-gray-100"
              >
                Close
              </Button>
            </SheetClose>

            {/* Checkout Button with conditional styling */}
            <Button
              onClick={handleCheckout}
              disabled={isBookDisabled}
              className={`outline-none block mt-4 text-center w-full uppercase ${
                isBookDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#800000] text-white hover:bg-[#8B0000]"
              }`}
            >
              Checkout
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      
    </>
  );
};

export default SideCart;
