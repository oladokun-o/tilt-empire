export interface Concert {

}

export interface Ticket {
  id: string | number;
  serial_number: string | number;
  concert_id: string | number;
  ticket_category_id: string | number;
  seat?: string | number;
  purchase_date: string | number;
}

export interface Customer {
  id: string | number;
  description: string;
  price: number;
  start_date: string | number;
  end_date: string | number;
  location: string | number;
  concert_id: string | number;
}

export interface Order_Ticket {
  id: string | number;
  customer_order_id: string | number;
  ticket_id: string | number;
}

export interface Customer_Order {
  id: string | number;
  customer_id: string | number;
  order_time: string | number;
  delivery_address?: string;
  delivery_email_address: string;
  preferred_delivery_time?: string | number;
  time_paid: string | number;
  total_price: number;
  discount: number;
  final_price: number;
}

export interface Customer {
  id: string | number;
  customer_name: string;
  email: string;
  user_name: string;
  password: string | number;
  confirmation_code: string | number;
  confirmation_time: string | number;
}

export interface Raffle {
  id: number;
  name: string;
  image: string;
  images: string[];
  price: number;
  tickets?: number;
  color?: string;
  description: string;
  raffleDate?: string;
  raffleTime?: string;
  raffleStatus: string;
  currency: string;
  sizes: number[];
  isCollapsed: boolean;
}
