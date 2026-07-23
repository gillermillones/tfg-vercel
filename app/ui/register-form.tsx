'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { registerUser, RegisterState } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const initialState: RegisterState = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    registerUser,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8" aria-describedby='general-error'>
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Por favor, registrate para continuar
        </h1>
        <div className="w-full">
            <div>
                <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
                >
                    Nombre de usuario
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your user name"
                        aria-describedby='name-error'
                        required
                    />
                    <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.name &&
                        state.errors.name.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>
            <div>
                <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="email"
                >
                    Correo electronico
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        aria-describedby='email-error'
                        required
                    />
                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="email-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.email &&
                        state.errors.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="password"
                >
                    Contraseña
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        aria-describedby='password-error'
                        required
                        minLength={6}
                    />
                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="password-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.password &&
                        state.errors.password.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="password2"
                >
                    Repite la contraseña
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="password2"
                        type="password"
                        name="password2"
                        placeholder="Repeat password"
                        aria-describedby='password2-error'
                        required
                        minLength={6}
                    />
                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                <div id="password2-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.password2 &&
                        state.errors.password2.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full">
          Registrate <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div id="general-error" aria-live="polite" aria-atomic="true">
          {state.message ?
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
            : <></>
          }
        </div>
      </div>
    </form>
  );
}
