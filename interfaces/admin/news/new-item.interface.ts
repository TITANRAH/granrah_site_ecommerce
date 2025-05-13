export interface NewItemInterface {
  title: string;
  textPrev: string;
  srcImages: string[];
  urlVideos: string[];
  noticeTextP1: string;
  noticeTextP2: string | null;
  noticeTextP3: string | null;
  noticeTextP4: string | null;
  isFeatured: boolean;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
