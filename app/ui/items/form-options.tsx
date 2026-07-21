export default function FormOptions({ field }: { field: string }) {

    return (
        <fieldset aria-describedby={`${field}-error`}>
            <legend className="mb-2 block text-sm font-medium">
                Set the {field} value
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4" aria-describedby={`${field}-error`}>
                    <div className="flex items-center">
                        <input
                        id="1"
                        name={field}
                        type="radio"
                        value="1"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor="1"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                        >
                            1
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id="2"
                        name={field}
                        type="radio"
                        value="2"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor="2"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            2
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id="3"
                        name={field}
                        type="radio"
                        value="3"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor="3"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            3
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id="4"
                        name={field}
                        type="radio"
                        value="4"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor="4"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            4
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id="5"
                        name={field}
                        type="radio"
                        value="5"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor="5"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            5
                        </label>
                    </div>
                </div>
            </div>
            <div id={`${field}-error`} aria-live="polite" aria-atomic="true">
                {state.errors?.[field] &&
                state.errors.[field].map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}
            </div>
        </fieldset>
    );
}

    