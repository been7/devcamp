import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { registerSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterInput = z.infer<typeof registerSchema>;

export default function login() {
  const loginForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 유효성 검사 후 폼 제출
  const onSubmit = (data: RegisterInput) => {
    loginForm.trigger(["email", "password"]);

    const emailState = loginForm.getFieldState("email");
    const passwordState = loginForm.getFieldState("password");

    if (!emailState.isDirty || emailState.invalid) return;
    if (!passwordState.isDirty || passwordState.invalid) return;

    // 유효성 검사 통과해도 알럿 안뜸..
    alert(data.password);
  };

  // 수정중
  // const handleLoginButton = () => {
  //   loginForm.trigger(["email", "password"]);

  //   const emailState = loginForm.getFieldState("email");
  //   const passwordState = loginForm.getFieldState("password");

  //   if (!emailState.isDirty || emailState.invalid) return;
  //   if (!passwordState.isDirty || passwordState.invalid) return;

  //   // 폼 제출 핸들러 호출
  //   loginForm.handleSubmit(onSubmit)();
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[450px] h-[500px] flex justify-center flex-col">
        <CardHeader className="mb-5">
          <CardTitle>로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)}>
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일을 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <div className="flex justify-center items-center flex-col">
          <div className="mb-3 mt-5">
            <Button
              type="submit"
              className="w-[350px]"
              onClick={loginForm.handleSubmit(onSubmit)}
            >
              로그인
            </Button>
          </div>
          <Link href="/">
            <Button type="button" variant="outline" className="w-[350px]">
              회원가입
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
