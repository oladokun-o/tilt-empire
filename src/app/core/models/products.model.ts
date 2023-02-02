export interface Event {
  _id: string
  checkout_link: string;
  currency: string;
  datetime: Date;
  description: string;
  imageUrl: string;
  price: number;
  vip_price?: number;
  stock: number;
  title: string;
  location: string;
  tags: string[]
}

export interface RootObject {
  ms: number;
  query: string;
  result: Event[];
}

export const events_query: string = `*[_type == 'ticket']{
  title,
  _id,
  description,
  price,
  vip_price,
  currency,
  'imageUrl': image.asset->url,
  datetime,
  stock,
  checkout_link,
  location,
  tags
}`;
