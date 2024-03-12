import { z } from "zod";

export const PaySchema = z.object({
  coupon: z.string(),
  point: z.string(),
});
