"use client";

import React from "react";
import Image from "next/image";
import { EyeIcon, ShoppingCart } from "lucide-react";
import { Card } from "@/constants/landing/draggable-card/draggable-card-items";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DraggableCardItemProps {
  card: Card;
  distance: number;
}
function DraggableCardItem({ card, distance }: DraggableCardItemProps) {
  const router = useRouter();
  return (
    <div
      className="relative w-full  h-full bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 flex items-center justify-center"
      style={{
        filter: `brightness(${1 - Math.abs(distance) * 0.2})`,
      }}
    >
      {/* Imagen de fondo */}

      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover absolute inset-0 w-full h-full"
      />

      {/* Gradiente para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
      {/* Contenido centrado */}
      <div className="relative z-20 flex flex-col items-start justify-end h-full w-full p-6">
        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
          {card.title}
        </h3>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:justify-center">
          <Button
            variant="outline"
            onClick={() => router.push(`/album/${card.id}`)}
            className="cursor-pointer"
          >
            <EyeIcon size={20} />
            <p className="text-base text-white/90">Ver Album</p>
          </Button>

          {card.venta && (
            <Button
              variant="outline"
              onClick={() => alert("Agregado al carrito")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 justify-center">
                <ShoppingCart size={20} />
                <p className="text-base text-white/90">Agregar al Carrito</p>
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DraggableCardItem;
