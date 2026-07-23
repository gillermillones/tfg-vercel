import MetadocenLogo from '@/app/ui/metadocen-logo';
import LoginForm from '@/app/ui/login-form';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};


export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <MetadocenLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
        <Link
            href="/register"
            className="group flex items-center w-full self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>No tienes cuenta? Registrate</span> <ArrowRightIcon className="h-5 w-5 ml-2 md:w-6 transition delay-150 duration-300 ease-in-out group-hover:translate-x-16" />
          </Link>
      </div>
    </main>
  );
}