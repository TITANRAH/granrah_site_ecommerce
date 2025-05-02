import { NewItemInterface } from "./new-item.interface";
import { NewCategoryInterface } from "./new-category.interface";

export interface NewResponse
  extends Omit<
    NewItemInterface,
    "noticeTextP2" | "noticeTextP3" | "noticeTextP4"
  > {
  id: string;
  noticeTextP2: string | null;
  noticeTextP3: string | null;
  noticeTextP4: string | null;
  category: NewCategoryInterface;
}
