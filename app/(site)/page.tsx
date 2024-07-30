import Image from "next/image";
import AuthForm from "../../components/layout/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-16 px-6 lg:px-8 bg-gray-100">
      <div className="mx-auto w-full max-w-md flex justify-center items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={48}
          height={48}
        />
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          NexuTalk
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
