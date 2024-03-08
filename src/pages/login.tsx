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
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "../../firebase";

type RegisterInput = z.infer<typeof registerSchema>;

export default function login() {
  const loginForm = useForm<RegisterInput>({
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

  // 유효성 검사 후 폼 제출
  // const onSubmit = (data: RegisterInput) => {
  //   loginForm.trigger(["email", "password"]);

  //   const emailState = loginForm.getFieldState("email");
  //   const passwordState = loginForm.getFieldState("password");

  //   if (!emailState.isDirty || emailState.invalid) return;
  //   if (!passwordState.isDirty || passwordState.invalid) return;

  //   // 유효성 검사 통과해도 알럿 안뜸..
  //   alert("login 성공");
  // };

  const handleLoginSubmit = async (data: RegisterInput) => {
    console.log("호출안되냐?");

    const { username, email, phone, role, password, confirmPassword } = data;
    console.log(email);

    loginForm.trigger(["email", "password"]);
    const emailState = loginForm.getFieldState("email");
    const passwordState = loginForm.getFieldState("password");

    // 이메일과 비밀번호 필드의 유효성 검사를 통과한 경우에만 로그인을 시도합니다.
    if (!emailState.invalid && !passwordState.invalid) {
      try {
        // 이메일과 비밀번호를 사용하여 로그인 시도
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        console.log("로그인 성공", userCredential.user);
      } catch (error) {
        console.error("로그인 실패", error);
        alert("login 실패");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[450px] h-[500px] flex justify-center flex-col">
        <CardHeader className="mb-5">
          <CardTitle>로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)}>
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일을 입력하세요."
                        {...field}
                      />
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
              onClick={loginForm.handleSubmit(handleLoginSubmit)}
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
