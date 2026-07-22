import MetadocenLogo from '@/app/ui/metadocen-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <MetadocenLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <p className={`${lusitana.className} antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}>
              <strong>Welcome to Metadocen.</strong> Here you can obtain
              custom metadata from your teaching resources, or explore
              many submited by others. Start here:
            </p>
          <Link
            href="/login"
            className="group/login flex items-start self-start rounded-lg bg-blue-500 pl-3 pr-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6 ml-2 transition delay-150 duration-300 ease-in-out group-hover/login:translate-x-6" />
          </Link>
          <Link
            href="/register"
            className="group/signup flex items-start self-start rounded-lg bg-blue-500 pl-3 pr-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Sign Up</span> <ArrowRightIcon className="w-5 ml-2 md:w-6 transition delay-150 duration-300 ease-in-out group-hover/signup:translate-x-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/infografias.jpg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Esquema que resume los apartados a evaluar en un documento, version de escritorio"
          />
          <Image
            src="/infografias.jpg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Esquema que resume los apartados a evaluar en un documento, version de movil"
          />
        </div>
      </div>
    </main>
  );
}
