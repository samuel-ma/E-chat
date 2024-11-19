export interface Product {
    id: number;  // ID as a number
    name: string;
    description: string;
    price: number;
    image: string;
  }
  
  export interface CartItem {
    id: number;         // Change 'string' to 'number'
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  