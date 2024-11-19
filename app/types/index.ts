export interface Product {
    id: number;  // ID as a number
    title: string;
    description: string;
    price: number;
    image: string;
  }
  
  export interface CartItem {
    id: number;         // Change 'string' to 'number'
    title: string;
    price: number;
    description: string;
    image: string;
  }
  
  