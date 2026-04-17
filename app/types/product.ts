export type ISODateString = string;

export type ImageType = "artwork" | "product" | "model";

export interface Color {
  id: number;
  name: string;
  hex_code: string | null;
}

export interface Image {
  id: number;
  cdn_id: string;
  ratio: number;
  _type: ImageType;
  url: string | null;
  bg: string | null;
  tags: string[] | null;
  extra_rand: string;
  color_id: number | null;
  color: Color | null;
  product_id: number;
}

export interface Variant {
  id: number;
  usd_price: number;
  size: string;
  color_id: number | null;
  color: Color | null;
  date_added: ISODateString;
  supplier_variant_id: number;
  product_id: number;
}

export interface Collection {
  id: number;
  human_id: string;
  name?: string;
}

export interface Product {
  id: number;
  name: string;
  human_id: string;
  summary: string;
  supplier_product_id: number;
  date_added: ISODateString;
  collection_id: number;
  materials: string[];

  variants: Variant[];
  images: Image[];
  collection: Collection;
}
