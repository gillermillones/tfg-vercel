'use client';

import { ItemData } from '@/app/lib/definitions';
import FormOptionsEdit  from '@/app/ui/items/form-options-edit';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateItem, ItemState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditItemForm({ data }: {data: ItemData }) {
    const updateDataWithId = updateItem.bind(null, data.id);
    const initialState: ItemState = { message: null, errors: {} };
    const [state, formAction] = useActionState(updateDataWithId, initialState);

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
                                defaultValue={data.name}
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
                                defaultValue={data.extension}
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
                                defaultValue={data.summary}
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
                <fieldset className="mb-4" aria-describedby="description-error">
                    <FormOptionsEdit field="description" num={data.description}></FormOptionsEdit>
                    <div id="description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.description &&
                        state.errors.description.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="quality-error">
                    <FormOptionsEdit field="quality" num={data.quality}></FormOptionsEdit>
                    <div id="quality-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.quality &&
                        state.errors.quality.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="capacity-error">
                    <FormOptionsEdit field="capacity" num={data.capacity}></FormOptionsEdit>
                    <div id="capacity-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.capacity &&
                        state.errors.capacity.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="adaptable-error">
                    <FormOptionsEdit field="adaptable" num={data.adaptable}></FormOptionsEdit>
                    <div id="adaptable-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.adaptable &&
                        state.errors.adaptable.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="interaction-error">
                    <FormOptionsEdit field="interaction" num={data.interaction}></FormOptionsEdit>
                    <div id="interaction-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.interaction &&
                        state.errors.interaction.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="motivation-error">
                    <FormOptionsEdit field="motivation" num={data.motivation}></FormOptionsEdit>
                    <div id="motivation-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.motivation &&
                        state.errors.motivation.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="design-error">
                    <FormOptionsEdit field="design" num={data.design}></FormOptionsEdit>
                    <div id="design-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.design &&
                        state.errors.design.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="reusable-error">
                    <FormOptionsEdit field="reusable" num={data.reusable}></FormOptionsEdit>
                    <div id="reusable-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.reusable &&
                        state.errors.reusable.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="portable-error">
                    <FormOptionsEdit field="portable" num={data.portable}></FormOptionsEdit>
                    <div id="portable-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.portable &&
                        state.errors.portable.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="toughness-error">
                    <FormOptionsEdit field="toughness" num={data.toughness}></FormOptionsEdit>
                    <div id="toughness-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.toughness &&
                        state.errors.toughness.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="structure-error">
                    <FormOptionsEdit field="structure" num={data.structure}></FormOptionsEdit>
                    <div id="structure-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.structure &&
                        state.errors.structure.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="navigation-error">
                    <FormOptionsEdit field="navigation" num={data.navigation}></FormOptionsEdit>
                    <div id="navigation-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.navigation &&
                        state.errors.navigation.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="operable-error">
                    <FormOptionsEdit field="operable" num={data.operable}></FormOptionsEdit>
                    <div id="operable-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.operable &&
                        state.errors.operable.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="av_accessible-error">
                    <FormOptionsEdit field="av_accessible" num={data.av_accessible}></FormOptionsEdit>
                    <div id="av_accessible-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.av_accessible &&
                        state.errors.av_accessible.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </fieldset>
                <fieldset className="mb-4" aria-describedby="text_accessible-error">
                    <FormOptionsEdit field="text_accessible" num={data.text_accessible}></FormOptionsEdit>
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
                href="/dashboard/files"
                className="flex h-10 items-center rounded-lg bg-red-400 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-red-500"
                >
                    Cancel
                </Link>
                <Button type="submit">Confirm editing</Button>
            </div>
        </form>
    );
}