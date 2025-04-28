"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { conctacFormSchema } from "@/schemas/contac-form.schema";

export function ContactForm() {
  const form = useForm<z.infer<typeof conctacFormSchema>>({
    resolver: zodResolver(conctacFormSchema),
    defaultValues: {
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    },
  });

  const bars = Array.from({ length: 5 }, (_, i) => i);

  function onSubmit(values: z.infer<typeof conctacFormSchema>) {
    console.log(values);
    toast.success("¡Mensaje enviado!", {
      description:
        "Gracias por contactar conmigo. Te responderé lo antes posible.",
    });
    form.reset();
  }

  return (
    <div className="flex w-full flex-col md:flex-row gap-8 items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-[#0A0A0A] backdrop-blur-sm rounded-xl shadow-xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-full h-20 bg-[#0A0A0A] rounded-xl overflow-hidden p-4 flex items-center justify-center gap-2">
                {bars.map((i) => (
                  <motion.div
                    key={i}
                    className="w-4 bg-red-800 rounded-sm"
                    animate={{
                      height: ["20%", "90%", "40%", "70%", "20%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="asunto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Asunto del mensaje" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mensaje"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe tu mensaje aquí..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-r from-red-400 to-red-800 hover:from-red-700 hover:to-red-900 text-white"
            >
              Enviar Mensaje
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
