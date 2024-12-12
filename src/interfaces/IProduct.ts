type Reviews = {
  rating: number;
  reviewerName: string;
  comment: string;
  date: string;
}


export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  reviews: Reviews[];
}
