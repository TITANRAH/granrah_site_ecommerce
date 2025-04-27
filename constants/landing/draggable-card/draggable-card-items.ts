export interface Card {
  id: number;
  title: string;
  image: string;
}

export const cards: Card[] = [
  { id: 1, title: "Titán", image: "/images/album-covers/titan.jpg" },
  {
    id: 4,
    title: "Hermanas Paredes",
    image: "/images/landing/album-covers/hermanas-paredes.jpg",
  },
  { id: 2, title: "Híbrido", image: "/images/landing/album-covers/hibrido.jpg" },
  {
    id: 3,
    title: "Lenguaje Vivo",
    image: "/images/landing/album-covers/lenguaje-vivo.jpg",
  },
];
