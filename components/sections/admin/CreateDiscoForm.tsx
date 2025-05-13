"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useToast } from "@/hooks/use-toast";
import { createDisco } from "@/actions/admin/create.disco.action";
import { discoSchema } from "@/schemas/disco.schema";
import { DiscoItemInterface } from "@/interfaces/admin/discos/disco.interface";

const CreateDiscoForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof discoSchema>>({
    resolver: zodResolver(discoSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      featurings: [],
      descriptionP1: "",
      descriptionP2: null,
      descriptionP3: null,
      descriptionP4: null,
    },
  });

  async function onSubmit(values: z.infer<typeof discoSchema>) {
    console.log("values", values);

    const response = await createDisco(values);

    if (!response.success) {
      toast({
        title: "¡UPS!",
        description: "Hubo un error vuelve a intentarlo",
        className: "bg-red-500 text-white",
      });
      form.reset();
    } else {
      toast({
        title: "¡UP!",
        description: "¡Disco creado con éxito!",
        className: "bg-green-400 text-white",
      });
      form.reset();
    }
  }

  const handleCloudinaryUpload = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.info &&
      typeof result.info === "object" &&
      "secure_url" in result.info
    ) {
      const url = result.info.secure_url;
      form.setValue("imageUrl", url);
      toast({
        title: "¡UP!",
        description: "Imagen subida con éxito",
        className: "bg-green-400",
      });
    }
  };

  const handleFeaturingsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const featurings = e.target.value.split(",").map((item) => item.trim());
    form.setValue("featurings", featurings);
  };

  const requiredFieldsFilled =
    !!form.watch("title") &&
    !!form.watch("descriptionP1") &&
    form.watch("featurings").length > 0;

  return (
    <>
      <Form {...form}>
        <div className="mt-3 text-3xl text-foreground text-center">
          Crear un nuevo disco
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl mx-auto p-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título del disco" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featurings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artistas (separados por coma)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Lista de artistas, separados por coma"
                    onChange={handleFeaturingsChange}
                    value={field.value.join(", ")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {[
            "descriptionP1",
            "descriptionP2",
            "descriptionP3",
            "descriptionP4",
          ].map((name, index) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof DiscoItemInterface}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Párrafo ${index + 1}`}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Contenido del párrafo ${index + 1}`}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {requiredFieldsFilled && (
            <>
              <FormItem className="flex flex-col">
                <FormLabel>Subir Imagen de Portada</FormLabel>
                <CldUploadButton
                  uploadPreset="granrah_site_ecommerce"
                  onSuccess={handleCloudinaryUpload}
                  className="bg-green-400 hover:bg-green-600 py-2 px-3 rounded-xl text-white font-bold"
                />
              </FormItem>
            </>
          )}

          <Button type="submit" className="w-full p-2 cursor-pointer border hover:bg-sky-400 ">
            Crear disco
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateDiscoForm;
