import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const phoneRegex = /^010\d{8}$/;

export const registerSchema = z.object({
  username: z
    .string()
    .min(2, { message: "이름은 2글자 이상이어야 합니다." })
    .max(100, { message: "이름은 100글자 이하여야 합니다." }),
  email: z.string().email({ message: "올바른 이메일을 입력해주세요" }),
  phone: z
    .string()
    .min(11, "연락처는 11자리여야 합니다.")
    .max(11, "연락처는 11자리여야 합니다.")
    .refine((value) => phoneRegex.test(value), {
      message: "010으로 시작하는 11자리 숫자를 입력해주세요.",
    }),
  role: z.string().min(2, { message: "역할을 선택해주세요" }),
});
