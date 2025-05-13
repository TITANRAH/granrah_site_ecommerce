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
import { createNews } from "@/actions/admin/create.new.action";
import { newsSchema } from "@/schemas/news.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewCategoryInterface } from "@/interfaces/admin/news/new-category.interface";
import { ApiResponse } from "@/interfaces/api-response/api-response.interface";

interface CreateNewsFormProps {
  categories: ApiResponse<NewCategoryInterface[]>;
}

const CreateNewsForm = ({ categories }: CreateNewsFormProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newsSchema>>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      textPrev: "",
      srcImages: [],
      urlVideos: [],
      noticeTextP1: "",
      noticeTextP2: "",
      noticeTextP3: "",
      noticeTextP4: "",
      isFeatured: false,
      categoryId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newsSchema>) {
    console.log("values", values);

    const response = await createNews(values);

    if (!response.success) {
      toast({
        title: "!UPS¡",
        description: "Hubo un error vuelve a intentarlo",
        className: "bg-red-500 text-white",
      });
      form.reset();
    } else {
      toast({
        title: "!UP¡",
        description: "!Noticia creada con éxito¡",
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
      console.log("url", url);
      const currentImages = form.getValues("srcImages") || [];
      form.setValue("srcImages", [...currentImages, url]);
      toast({
        title: "UP¡",
        description: "imagenes subidas",
        className: "bg-green-400",
      });
    }
  };

  const requiredFieldsFilled =
    !!form.watch("title") &&
    !!form.watch("textPrev") &&
    !!form.watch("noticeTextP1");

  return (
    <>
      <Form {...form}>
        <div className="mt-3 text-3xl text-foreground text-center">
          Crea una noticia
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
                  <Input placeholder="Título de la noticia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="textPrev"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Texto Previo / Resumen</FormLabel>
                <FormControl>
                  <Textarea placeholder="Resumen de la noticia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {["noticeTextP1", "noticeTextP2", "noticeTextP3", "noticeTextP4"].map(
            (name, index) => (
              <FormField
                key={name}
                control={form.control}
                name={name as "noticeTextP1" | "noticeTextP2" | "noticeTextP3"}
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
            )
          )}
          {requiredFieldsFilled && (
            <>
              <FormItem className="flex flex-col">
                <FormLabel>Subir Imágenes</FormLabel>
                <CldUploadButton
                  uploadPreset="granrah_site_ecommerce"
                  onSuccess={handleCloudinaryUpload}
                  className="bg-green-400 hover:bg-green-600 py-2 px-3 rounded-xl text-white font-bold"
                />
              </FormItem>
            </>
          )}

          <FormField
            control={form.control}
            name="urlVideos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Videos (URLs)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Pega aquí las URLs de videos, separadas por coma"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((url) => url.trim())
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Noticia Destacada</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Marca esta opción si quieres que la noticia aparezca
                    destacada
                  </p>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.data?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full p-2 cursor-pointer border hover:bg-sky-400 "
          >
            Crear Noticia
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateNewsForm;
