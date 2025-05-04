import { DefaultSession } from "next-auth";
import { AdapterUser } from "@auth/core/adapters";

interface Direccion {
  id: string;
  calle: string;
  numero: string;
  comuna: string;
  ciudad: string;
  region: string;
  codigoPostal: string;
  isDefault: boolean;
  tipo: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      emailVerified?: Date | null;
      direcciones?: Direccion[];
    } & DefaultSession["user"];
  }

  interface User extends AdapterUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    emailVerified?: Date | null;
    direcciones?: Direccion[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    emailVerified?: Date | null;
    direcciones?: Direccion[];
  }
}
