'use client';

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

export default function ItemForm() {
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
                <label htmlFor="summary" className="mb-2 block text-sm font-medium">
                    File description
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="summary"
                            name="summary"
                            type="text"
                            placeholder="File description"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="summary-error"
                        />
                    </div>
                    <div id="summary-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.summary &&
                        state.errors.summary.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            {/* Evaluated fields */}
            <fieldset  aria-describedby="description-error">
                <FormOptions field="description"></FormOptions>
                <div id="description-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.description &&
                    state.errors.description.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="quality-error">
                <FormOptions field="quality"></FormOptions>
                <div id="quality-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.quality &&
                    state.errors.quality.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="capacity-error">
                <FormOptions field="capacity"></FormOptions>
                <div id="capacity-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.capacity &&
                    state.errors.capacity.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="adaptable-error">
                <FormOptions field="adaptable"></FormOptions>
                <div id="adaptable-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.adaptable &&
                    state.errors.adaptable.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="interaction-error">
                <FormOptions field="interaction"></FormOptions>
                <div id="interaction-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.interaction &&
                    state.errors.interaction.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="motivation-error">
                <FormOptions field="motivation"></FormOptions>
                <div id="motivation-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.motivation &&
                    state.errors.motivation.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="design-error">
                <FormOptions field="design"></FormOptions>
                <div id="design-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.design &&
                    state.errors.design.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="reusable-error">
                <FormOptions field="reusable"></FormOptions>
                <div id="reusable-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.reusable &&
                    state.errors.reusable.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="portable-error">
                <FormOptions field="portable"></FormOptions>
                <div id="portable-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.portable &&
                    state.errors.portable.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="toughness-error">
                <FormOptions field="toughness"></FormOptions>
                <div id="toughness-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.toughness &&
                    state.errors.toughness.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="structure-error">
                <FormOptions field="structure"></FormOptions>
                <div id="structure-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.structure &&
                    state.errors.structure.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="navigation-error">
                <FormOptions field="navigation"></FormOptions>
                <div id="navigation-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.navigation &&
                    state.errors.navigation.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="operable-error">
                <FormOptions field="operable"></FormOptions>
                <div id="operable-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.operable &&
                    state.errors.operable.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="av_accessible-error">
                <FormOptions field="av_accessible"></FormOptions>
                <div id="av_accessible-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.av_accessible &&
                    state.errors.av_accessible.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
            <fieldset  aria-describedby="text_accessible-error">
                <FormOptions field="text_accessible"></FormOptions>
                <div id="text_accessible-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.text_accessible &&
                    state.errors.text_accessible.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </fieldset>
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