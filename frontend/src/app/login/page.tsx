"use client";

import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { httpClient } from "@/lib/api/http";
import { validateEmail, validatePassword } from "@/utils/vaildation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

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

    if (!validateForm()) {
      return;
    }

    try {
      const response = await httpClient.post('/auth/login', {
        email,
        password
      });

      console.log('로그인 성공:', response.data);
      localStorage.setItem('accessToken', response.data.data.accessToken);
      router.push('/');
    } catch (error: any) {
      console.error('로그인 실패:', error);
      alert('로그인 실패했습니다.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col px-4 py-6">
      <header className="flex items-center justify-center h-80">
        <Image
          src="/logo-vertical.svg"
          alt="dot_daily logo"
          width={60}
          height={60}
          priority
        />
      </header>

      <section>
        <form onSubmit={onLogin} className="flex flex-col gap-6">
          <Input
            type="email"
            label="이메일"
            placeholder="dotdaly@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            state={errors.email ? 'error' : 'default'}
            required
          />
          <Input
            type="password"
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            state={errors.password ? 'error' : 'default'}
            required
          />
          <Button label="로그인" className="mt-4" />
        </form>
      </section>

      <section aria-label="소셜 로그인" className="flex items-center justify-center gap-6 my-8">
        <Image
          src="/kakao.svg"
          alt="kakao login"
          width={48}
          height={48}
          className="cursor-pointer hover:scale-110"
        />
        <Image
          src="/google.svg"
          alt="google login"
          width={48}
          height={48}
          className="cursor-pointer hover:scale-110"
        />
      </section>

      <nav className="flex justify-center gap-2 text-sm text-gray-600" aria-label="로그인 관련 링크">
        <Link href="/find-password">비밀번호 찾기</Link>
        <span>|</span>
        <Link href="/find-email">이메일 찾기</Link>
        <span>|</span>
        <Link href="/signup">회원가입</Link>
      </nav>
    </main>
  );
}

export default LoginPage;
