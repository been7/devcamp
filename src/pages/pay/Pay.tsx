import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterInput = z.infer<typeof PaySchema>;

type ProductData = {
  productName: string;
  quantity: string;
  price: string;
};

export default function Pay() {
  const [productData, setProductData] = useState<ProductData | null>(null); // 결제할 상품
  const [initialPrice, setInitialPrice] = useState<number>(); // 최초 가격
  const [finalPrice, setFinalPrice] = useState<number>(); // 최종 가격
  const [afterCouponPrice, setAfterCouponPrice] = useState<number>();
  const [applyCoupon, setApplyCoupon] = useState<boolean>(false); // 쿠폰 사용 여부
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>(""); // 선택된 결제 방법

  const form = useForm<RegisterInput>({
    resolver: zodResolver(PaySchema),
    defaultValues: {
      point: "0",
    },
  });

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          throw new Error("데이터 가져오기 실패!");
        }

        const data: ProductData = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("에러 : ", error);
      }
    }

    fetchProductData();
  }, []);

  useEffect(() => {
    if (productData) {
      const price = parseInt(
        productData.price.replace("원", "").replace(",", "")
      );
      setInitialPrice(price);
      setFinalPrice(price);
      setAfterCouponPrice(price);
    }
  }, [productData]);

  function onSubmit(data: RegisterInput) {
    const coupon = data.coupon;

    let price = initialPrice; // 상품의 원래 가격

    if (coupon && coupon.includes("%")) {
      const couponPercentage = parseInt(coupon.replace("%", "")); // '%' 문자 제거 후 숫자로 변환
      price = price! * (1 - couponPercentage / 100); // 할인된 가격 계산
    } else {
      const couponValue = parseInt(coupon!.replace(",", "")); // 선택된 쿠폰 값을 숫자로 변환
      if (!isNaN(couponValue)) {
        price! -= couponValue; // 쿠폰 값을 상품 가격에서 차감
      }
    }
    // 쿠폰 적용된 상태
    setApplyCoupon(true);

    // 최종 결제 금액
    setFinalPrice(price);

    // 포인트 적용에 사용할 최종 결제 금액
    setAfterCouponPrice(price ?? 0);

    // 포인트 입력값 초기화
    form.setValue("point", "0");
  }

  useEffect(() => {
    if (applyCoupon) {
      // 쿠폰이 적용시 포인트 초기화
      form.setValue("point", "0");
    }
  }, [applyCoupon]);

  const onSubmitPoint = (data: z.infer<typeof PaySchema>) => {
    const point = data.point;

    let price = afterCouponPrice; // 쿠폰 적용 후 가격을 기준으로 포인트를 적용

    if (+point! <= 2000) {
      price! -= +point!;
    }

    // 최종 결제 금액 업데이트
    setFinalPrice(price);
  };

  const handlePayment = () => {
    if (selectedPaymentMethod === "bankTransfer") {
      // 무통장 입금 선택 시
    } else if (selectedPaymentMethod === "tossPay") {
      // 토스페이 선택 시
    } else {
    }
  };

  // 선택된 결제 방법 변경
  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col space-y-5">
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
                <p>{productData?.productName}</p>
              </div>
              <div>
                <p>{productData?.quantity}</p>
              </div>
              <div>
                <p>{productData?.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[750px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="coupon"
                render={({ field }) => (
                  <FormItem>
                    <CardHeader>
                      <CardTitle>쿠폰</CardTitle>
                    </CardHeader>
                    <div className="flex justify-center space-x-10 w-100">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value!}
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
                    <CardHeader>
                      <CardTitle>포인트</CardTitle>
                    </CardHeader>
                    <div className="flex justify-center space-x-6">
                      <div>
                        <input
                          className="w-[100px]"
                          type="number"
                          value={field.value ?? ""}
                          onChange={field.onChange}
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
      <div>
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>최종 결제 금액</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{finalPrice}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle>결제 방법</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue="comfortable"
            className="flex flex justify-center"
            onValueChange={handlePaymentMethodChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bankTransfer" id="r1" />
              <Label htmlFor="r1">무통장입금</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tossPay" id="r2" />
              <Label htmlFor="r2">토스페이</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      <Button onClick={handlePayment}>결제하기</Button>
    </div>
  );
}
