export interface NewItemInterface {
  title: string;
  textPrev: string;
  srcImages: string[];
  urlVideos: string[];
  noticeTextP1: string;
  noticeTextP2?: string;
  noticeTextP3?: string;
  noticeTextP4?: string;
  isFeatured: boolean;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
