import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";

interface RegisterParams {
  name: string;
  email: string;
  password: string;
  direccion?: {
    calle: string;
    numero: string;
    comuna: string;
    ciudad: string;
    region: string;
    codigoPostal: string;
    tipo: "envio" | "facturacion";
  };
}

export const register = async (params: RegisterParams) => {
  try {
    const { name, email, password, direccion } = params;

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "El email ya está registrado",
      };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear el usuario con o sin dirección
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashPassword: hashedPassword,
        ...(direccion && {
          direcciones: {
            create: {
              ...direccion,
              isDefault: true, // La primera dirección se marca como predeterminada
            },
          },
        }),
      },
      include: {
        direcciones: true,
      },
    });

    // Eliminar el hashPassword de la respuesta
    const userWithoutPassword = Object.fromEntries(
      Object.entries(user).filter(([key]) => key !== "hashPassword")
    );

    return {
      success: true,
      data: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error en registro:", error);
    return {
      success: false,
      error: "Error al registrar usuario",
    };
  }
};
