export interface Card {
  id: number;
  title: string;
  image: string;
  venta: boolean;
}

export const cards: Card[] = [
  {
    id: 1,
    title: "Titán",
    image: "/images/album-covers/titan.jpg",
    venta: true,
  },
  {
    id: 2,
    title: "Híbrido",
    image: "/images/landing/album-covers/hibrido.jpg",
    venta: true,
  },
  {
    id: 3,
    title: "Lenguaje Vivo",
    image: "/images/landing/album-covers/lenguaje-vivo.jpg",
    venta: true,
  },
  {
    id: 4,
    title: "Hermanas Paredes",
    image: "/images/landing/album-covers/hermanas-paredes.jpg",
    venta: true,
  },
  {
    id: 5,
    title: "No es fresco es crudo",
    image: "/images/landing/album-covers/no-es-fresco-es-crudo.jpg",
    venta: false,
  },
  {
    id: 6,
    title: "pirata",
    image: "/images/landing/album-covers/pirata.jpg",
    venta: false,
  },
  {
    id: 7,
    title: "Musageta",
    image: "/images/landing/album-covers/musageta.jpg",
    venta: false,
  },
  {
    id: 8,
    title: "Gran Reserva",
    image: "/images/landing/album-covers/gran-reserva.jpg",
    venta: false,
  },
  {
    id: 9,
    title: "Banda Sonora",
    image: "/images/landing/album-covers/banda-sonora.jpg",
    venta: false,
  },
  {
    id: 10,
    title: "Apogeo",
    image: "/images/landing/album-covers/apogeo.png",
    venta: false,
  },
  {
    id: 11,
    title: "The Endo",
    image: "/images/landing/album-covers/the-end.jpg",
    venta: false,
  },
  {
    id: 12,
    title: "The Real Shit",
    image: "/images/landing/album-covers/the-real-shit.jpg",
    venta: false,
  },
  {
    id: 13,
    title: "The Versouls",
    image: "/images/landing/album-covers/the-versouls.jpg",
    venta: false,
  },
  {
    id: 14,
    title: "Segundo Cero",
    image: "/images/landing/album-covers/segundo-cero.jpg",
    venta: false,
  },
];
