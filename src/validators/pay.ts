// import { z } from "zod";

// export const PaySchema = z.object({
//   coupon: z.string(),
//   point: z.string(),
// });

import { z } from "zod";

export const PaySchema = z.object({
  coupon: z.string().optional(),
  point: z.string().nullable(),
});
