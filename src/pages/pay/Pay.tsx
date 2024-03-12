import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaySchema } from "@/validators/pay";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterInput = z.infer<typeof PaySchema>;

export default function Pay() {
  const [finalPrice, setFinalPrice] = useState<number>(10000);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(PaySchema),
    defaultValues: {
      point: "0",
    },
  });

  function onSubmit(data: RegisterInput) {
    const coupon = data.coupon;
    console.log(data.coupon.length);

    let price = 10000; // 상품의 원래 가격

    if (coupon.includes("%")) {
      const couponPercentage = parseInt(coupon.replace("%", "")); // '%' 문자 제거 후 숫자로 변환
      price = price * (1 - couponPercentage / 100); // 할인된 가격 계산
    } else {
      const couponValue = parseInt(coupon.replace(",", "")); // 선택된 쿠폰 값을 숫자로 변환
      if (!isNaN(couponValue)) {
        price -= couponValue; // 쿠폰 값을 상품 가격에서 차감
      }
    }

    // 최종 결제 금액 업데이트
    setFinalPrice(price);
  }

  const onSubmitPoint = (data: z.infer<typeof PaySchema>) => {
    const point = data.point;

    let price = finalPrice;

    if (+point <= 2000) {
      price -= +point;
    }

    setFinalPrice(price);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col space-y-5">
      {/* <div className="flex justify-center items-center h-screen flex-col"> */}
      <div className="space-y-5">
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>배송지</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <p className="font-bold text-lg">홍길동</p>
                <p>010-7777-7777</p>
                <p>서울특별시 송파구 방이동</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>주문상품</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex justify-center space-x-10">
                <div>
                  <p className="font-bold">상품정보</p>
                </div>
                <div>
                  <p className="font-bold">수량</p>
                </div>
                <div>
                  <p className="font-bold">가격</p>
                </div>
              </div>
            </div>
            <div
              className="flex justify-center space-x-10"
              style={{ overflow: "hidden" }}
            >
              <div className="flex justify-center">
                <Image
                  src="/image/tee.avif"
                  alt="제품사진"
                  layout="fixed"
                  width={50}
                  height={50}
                  objectFit="cover"
                />
                <p>망고T</p>
              </div>
              <div>
                <p>1개</p>
              </div>
              <div>
                <p>10,000원</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>쿠폰 & 포인트</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="font-bold">쿠폰</p>

          </div>
        </CardContent>
      </Card> */}{" "}
        <Card className="w-[750px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="coupon"
                render={({ field }) => (
                  <FormItem>
                    <CardHeader>
                      <CardTitle>
                        {/* <FormLabel>쿠폰</FormLabel> */}
                        쿠폰
                      </CardTitle>
                    </CardHeader>
                    <div className="flex justify-center space-x-10 w-100">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="쿠폰을 선택하세요." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5,000원">5,000원</SelectItem>
                          <SelectItem value="10%">10%</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <Button type="submit">적용</Button>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitPoint)}
              className="w-[350px]"
            >
              <FormField
                control={form.control}
                name="point"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>포인트</FormLabel> */}
                    <CardHeader>
                      <CardTitle>
                        {/* <FormLabel>쿠폰</FormLabel> */}
                        포인트
                      </CardTitle>
                    </CardHeader>
                    <div className="flex justify-center space-x-6">
                      <div>
                        <input
                          className="w-[100px]"
                          type="number"
                          {...field}
                          placeholder="포인트를 입력하세요."
                        />
                      </div>
                      <FormMessage />
                      <Button type="submit">적용</Button>
                      <p>보유 포인트 : 2,000</p>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
      </div>
      {/* <div className="flex justify-center items-center h-screen flex-col"> */}
      <div>
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>
              {/* <FormLabel>쿠폰</FormLabel> */}
              최종 결제 금액
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{finalPrice}</p>
          </CardContent>
        </Card>
      </div>
      <Button type="submit">결제하기</Button>
    </div>
  );
}
