"use client";

import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { httpClient } from "@/lib/api/http";
import { validateEmail, validatePassword } from "@/utils/vaildation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/Toast/ToastProvider";

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await httpClient.post("/auth/login", {
        email,
        password,
      });
      const accessToken =
        response.data.data?.accessToken || response.data.accessToken;
      if (accessToken) {
        const cleanToken = accessToken.startsWith("Bearer ")
          ? accessToken.substring(7)
          : accessToken;
        localStorage.setItem("accessToken", cleanToken);
        router.push("/");
      } else {
        showToast("로그인 처리 중 오류가 발생했습니다.");
      }
    } catch (error: any) {
      // 서버에서 422 등으로 에러 응답 시
      if (error?.response?.data?.errors?.email) {
        showToast(error.response.data.errors.email);
      } else {
        showToast("로그인 실패했습니다.");
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white px-2">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logo-vertical.svg"
            alt="dot_daily logo"
            width={60}
            height={60}
            priority
          />
          {/* <h1 className="text-2xl font-bold text-gray-900 tracking-tight">dot<span className="text-blue-400">.</span>daily</h1> */}
        </div>
        <form onSubmit={onLogin} className="flex flex-col gap-6">
          <Input
            type="email"
            label="이메일"
            placeholder="dotdaly@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            state={errors.email ? "error" : "default"}
            required
            className="rounded-full shadow-sm"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="비밀번호"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              state={errors.password ? "error" : "default"}
              required
              className="rounded-full shadow-sm"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <Button
            label="로그인"
            className="mt-4 w-full rounded-full py-3 text-lg font-bold shadow-md bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 transition"
          />
        </form>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-yellow-300 hover:bg-yellow-400 rounded-full py-3 font-bold text-gray-800 shadow transition"
          >
            <Image
              src="/kakao.svg"
              alt="카카오 로그인"
              width={24}
              height={24}
            />
            카카오로 로그인
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white border hover:bg-gray-100 rounded-full py-3 font-bold text-gray-700 shadow transition"
          >
            <Image src="/google.svg" alt="구글 로그인" width={24} height={24} />
            구글로 로그인
          </button>
        </div>
        <div className="flex justify-center pt-2">
          <Link
            href="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
