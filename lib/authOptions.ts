import { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prismadb';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Credenciales inválidas');
          }

          const cliente = await prisma.cliente.findUnique({
            where: {
              correo: credentials.email,
            },
          });

          if (!cliente || !cliente?.contrasena) {
            throw new Error('Usuario no encontrado');
          }

          const isCorrectPassword = await bcrypt.compare(credentials.password, cliente.contrasena);

          if (!isCorrectPassword) {
            throw new Error('Contraseña incorrecta');
          }

          return {
            id: cliente.id.toString(),
            nombre: cliente.nombre,
            email: cliente.correo,
            comuna: cliente.comuna,
            direccion: cliente.direccion,
            emailVerified: null,
            image: null,
          };
        } catch (error) {
          console.error('Error en authorize:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nombre = user.nombre;
        token.email = user.email;
        token.comuna = user.comuna;
        token.direccion = user.direccion;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          nombre: token.nombre,
          email: token.email,
          comuna: token.comuna,
          direccion: token.direccion,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 30, // 30 minutos
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
