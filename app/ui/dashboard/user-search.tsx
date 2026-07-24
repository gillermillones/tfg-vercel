'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { searchUserByName, SimpleState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default async function Page() {
    const initialState: SimpleState = { message: null };
    const [state, formAction] = useActionState(
        searchUserByName,
        initialState,
    );

  return (
        <form action={formAction}>
            <div className="flex flex-col">
                <div className="flex flex-row justify-end">
                    <input id="username" name="username" type="text" placeholder="Search username"
                        className="peer block w-full rounded-md border border-gray-200 py-2 ml-1 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby="name-error"
                    />
                    <button type="submit" className="rounded-md border p-2 bg-blue-400 hover:bg-blue-500">
                        <MagnifyingGlassIcon className="w-4" />
                    </button>
                </div>
                <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.message ?
                        <p className="mt-1 pl-4 text-sm text-red-500" key={state.message}>
                            {state.message}
                        </p>
                        : <></>
                    }
                </div>
            </div>
        </form>
  );
}