'use client';

import { CustomerField } from '@/app/lib/definitions';
import FormOptions  from '@/app/ui/items/form-options';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createItem, ItemState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
  const initialState: ItemState = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    createItem,
    initialState,
  );

  return (
    <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby="general-error">
            {/* Name */}
            <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    File name
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="File name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="name-error"
                        />
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
            </div>
            {/* Extension */}
            <div className="mb-4">
                <label htmlFor="extension" className="mb-2 block text-sm font-medium">
                    File extension
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="extension"
                            name="extension"
                            type="text"
                            placeholder="File extension"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="extension-error"
                        />
                    </div>
                    <div id="extension-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.extension &&
                        state.errors.extension.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            {/* File description */}
            <div className="mb-4">
                <label htmlFor="desc" className="mb-2 block text-sm font-medium">
                    File description
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="desc"
                            name="desc"
                            type="text"
                            placeholder="File description"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="desc-error"
                        />
                    </div>
                    <div id="desc-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.desc &&
                        state.errors.desc.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <FormOptions field="description"></FormOptions>
            <FormOptions field="quality"></FormOptions>
            <FormOptions field="capacity"></FormOptions>
            <FormOptions field="adaptable"></FormOptions>
            <FormOptions field="interaction"></FormOptions>
            <FormOptions field="motivation"></FormOptions>
            <FormOptions field="design"></FormOptions>
            <FormOptions field="reusable"></FormOptions>
            <FormOptions field="portable"></FormOptions>
            <FormOptions field="toughness"></FormOptions>
            <FormOptions field="structure"></FormOptions>
            <FormOptions field="navigation"></FormOptions>
            <FormOptions field="operable"></FormOptions>
            <FormOptions field="av_accessible"></FormOptions>
            <FormOptions field="text_accesible"></FormOptions>
        </div>
        <div id="general-error" aria-live="polite" aria-atomic="true">
            {state.message ?
                <p className="mt-2 text-sm text-red-500" key={state.message}>
                {state.message}
                </p>
                : <></>
            }
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Link
            href="/dashboard/items"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                Cancel
            </Link>
            <Button type="submit">Create Item</Button>
        </div>
    </form>
    );
}