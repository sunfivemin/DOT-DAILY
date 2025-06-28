"use client";

import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름이 입력되지 않았습니다.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일이 입력되지 않았습니다.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "비밀번호가가 입력되지 않았습니다.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "비밀번호가가 입력되지 않았습니다.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("회원가입 제출", formData);
    }
  };

  const onInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 flex flex-col">
      <header className="flex items-center justify-between">
        <Link href="/login" aria-label="뒤로가기">
          <Image src="/back.svg" alt="back" width={24} height={24} />
        </Link>
        <h2 className="font-bold">회원가입</h2>
        <div className="w-6" />
      </header>

      <div className="flex items-center justify-center h-60">
        <Image
          src="/logo-vertical.svg"
          alt="dot_daily logo"
          width={60}
          height={60}
          priority
        />
      </div>

      <form onSubmit={onSignup} className="flex-grow flex flex-col">
        <section className="flex-grow flex flex-col gap-8">
          <Input
            type="text"
            label="이름"
            placeholder="이름을 입력해주세요"
            value={formData.name}
            onChange={onInputChange('name')}
            error={errors.name}
            state={errors.name ? 'error' : 'default'}
          />
          <Input
            type="email"
            label="이메일"
            placeholder="dotdaily@email.com"
            value={formData.email}
            onChange={onInputChange('email')}
            error={errors.email}
            state={errors.email ? 'error' : 'default'}
          />
          <Input
            type="password"
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={formData.password}
            onChange={onInputChange('password')}
            error={errors.password}
            state={errors.password ? 'error' : 'default'}
          />
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={formData.confirmPassword}
            onChange={onInputChange('confirmPassword')}
            error={errors.confirmPassword}
            state={errors.confirmPassword ? 'error' : 'default'}
          />
        </section>
        <Button type="submit" label="가입하기" />
      </form>
    </main>
  );
}

export default SignupPage;
