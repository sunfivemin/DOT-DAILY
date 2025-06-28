import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import Image from "next/image";
import Link from "next/link";

function LoginPage() {
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
        <form className="flex flex-col gap-6">
          <Input
            type="email"
            label="이메일"
            placeholder="dotdaly@email.com"
            required
          />
          <Input
            type="password"
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
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
