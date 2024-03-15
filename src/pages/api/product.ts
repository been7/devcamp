import type { NextApiRequest, NextApiResponse } from "next";

type ProductData = {
  productName: string;
  quantity: string;
  price: string;
};

export default function Product(
  req: NextApiRequest,
  res: NextApiResponse<ProductData>
) {
  const productData: ProductData = {
    productName: "망고T",
    quantity: "1개",
    price: "10,000원",
  };
  res.status(200).json(productData);
}
