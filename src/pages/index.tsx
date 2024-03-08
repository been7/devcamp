import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { registerSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterInput = z.infer<typeof registerSchema>;

export default function Join() {
  const [step, setStep] = useState<number>(0);
  const { toast } = useToast();
  const router = useRouter();

  const joinForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleNextButton = () => {
    joinForm.trigger(["phone", "email", "username", "role"]);
    const phoneState = joinForm.getFieldState("phone");
    const emailState = joinForm.getFieldState("email");
    const usernameState = joinForm.getFieldState("username");
    const roleState = joinForm.getFieldState("role");

    if (!phoneState.isDirty || phoneState.invalid) return;
    if (!emailState.isDirty || emailState.invalid) return;
    if (!usernameState.isDirty || usernameState.invalid) return;
    if (!roleState.isDirty || roleState.invalid) return;

    setStep(1);
  };

  const handleJoinSubmit = (data: RegisterInput) => {
    if (data.password !== data.confirmPassword) {
      toast({
        variant: "destructive",
        title: "비밀번호가 일치하지 않습니다.",
        duration: 1000,
      });

      return;
    }

    toast({
      description: "회원가입 완료",
    });

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[450px] h-[500px] flex justify-center flex-col">
        <CardHeader>
          <CardTitle>계정을 생성합니다.</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
        </CardHeader>
        {step === 0 && (
          <div>
            <CardContent>
              <Form {...joinForm}>
                <FormField
                  control={joinForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={joinForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="abc123@test.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={joinForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="01012345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={joinForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>역할</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="역할을 선택하세요." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">관리자</SelectItem>
                          <SelectItem value="user">사용자</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                className="w-[130px]"
                onClick={handleNextButton}
              >
                다음 단계로 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </div>
        )}
        {step === 1 && (
          <div>
            <CardContent>
              <Form {...joinForm}>
                <form onSubmit={joinForm.handleSubmit(handleJoinSubmit)}>
                  <FormField
                    control={joinForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>비밀번호</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={joinForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>비밀번호 확인</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(0)}
                className="w-[130px]"
              >
                <ArrowLeft className="mr-2" />
                이전 단계로
              </Button>
              <Button
                type="button"
                className="w-[130px]"
                onClick={joinForm.handleSubmit(handleJoinSubmit)}
              >
                가입 완료
              </Button>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
