import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Youtube } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* Logo y descripción */}
          <div className="space-y-4 flex flex-col items-center">
            <Image 
              src="/images/logo.png" 
              alt="Gran Rah Logo" 
              width={150} 
              height={150}
              className="object-contain"
            />
            <p className="text-muted-foreground text-sm max-w-sm">
              Artista, productor y creador de contenido. Fusionando música y arte para crear experiencias únicas.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/music" className="text-muted-foreground hover:text-foreground transition">
                  Música
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition">
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-muted-foreground hover:text-foreground transition">
                  Tienda
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email: contacto@granrah.com
              </li>
              <li className="text-muted-foreground">
                Booking: booking@granrah.com
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4">Sígueme</h4>
            <div className="flex justify-center space-x-4">
              <Link 
                href="https://instagram.com" 
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="https://facebook.com" 
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="https://youtube.com" 
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Gran Rah. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 