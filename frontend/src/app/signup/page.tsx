"use client";

import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { useToast } from "@/components/ui/Toast/ToastProvider";
import { httpClient } from "@/lib/api/http";
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "@/utils/vaildation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const { showToast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log('회원가입 요청 데이터:', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword
      });

      const response = await httpClient.post('/auth/signup', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword
      });

      console.log('회원가입 성공:', response.data);
      showToast('회원가입에 성공했습니다.');
      router.push('/login');
    } catch (error: unknown) {
      console.error('회원가입 실패:', error);
      
      // 에러 타입 체크
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { errors?: Record<string, string[]>; message?: string } } };
        console.error('응답 데이터:', axiosError.response?.data);
        
        // 백엔드에서 온 구체적인 오류 메시지 표시
        if (axiosError.response?.data?.errors) {
          const errors = axiosError.response.data.errors;
          let errorMessage = '회원가입 실패:\n';
          
          Object.keys(errors).forEach(key => {
            if (errors[key] && errors[key].length > 0) {
              errorMessage += `${key}: ${errors[key][0]}\n`;
            }
          });
          
          alert(errorMessage);
        } else if (axiosError.response?.data?.message) {
          alert(`회원가입 실패: ${axiosError.response.data.message}`);
        } else {
          alert('회원가입에 실패했습니다. 네트워크 연결을 확인해주세요.');
        }
      } else {
        alert('회원가입에 실패했습니다. 네트워크 연결을 확인해주세요.');
      }
      
      showToast('회원가입에 실패했습니다.');
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