import { toast } from "sonner";

export const useToast = () => {
  return {
    toast: (props: {
      title: string;
      description: string;
      className?: string;
    }) => {
      toast(props.title, {
        description: props.description,
        className: props.className,
      });
    },
  };
};
