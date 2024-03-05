import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterInput = z.infer<typeof registerSchema>;

export default function Join() {
  const [step, setStep] = useState<number>(0);

  const joinForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      role: "",
    },
  });

  return (
    <Card className="w-[350px] m-auto ">
      <CardHeader>
        <CardTitle>계정을 생성합니다.</CardTitle>
        <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">이메일</Label>
              <Input id="name" placeholder="hello@sparta-devcamp.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">연락처</Label>
              <Input id="name" placeholder="01000000000" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">역할</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="역할을 선택해주세요." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">관리자</SelectItem>
                  <SelectItem value="sveltekit">일반사용자</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          className={step === 0 ? "join" : "hidden"}
          onClick={() => setStep(1)}
        >
          다음 단계로 <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
