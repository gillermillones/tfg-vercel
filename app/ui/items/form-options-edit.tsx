export default function FormOptionsEdit({ field, num }: { field: string, num: number }) {

    return (
        <div>
            <legend className="mb-2 block text-sm font-medium">
                Set the {field} value
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4" aria-describedby={`${field}-error`}>
                    <div className="flex items-center">
                        <input
                        id={`${field}-1`}
                        name={field}
                        type="radio"
                        value="1"
                        defaultChecked={num === 1}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor={`${field}-1`}
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-300 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            1
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id={`${field}-2`}
                        name={field}
                        type="radio"
                        value="2"
                        defaultChecked={num === 2}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor={`${field}-2`}
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-orange-300 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            2
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id={`${field}-3`}
                        name={field}
                        type="radio"
                        value="3"
                        defaultChecked={num === 3}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor={`${field}-3`}
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-300 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            3
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id={`${field}-4`}
                        name={field}
                        type="radio"
                        value="4"
                        defaultChecked={num === 4}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor={`${field}-4`}
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-300 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            4
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id={`${field}-5`}
                        name={field}
                        type="radio"
                        value="5"
                        defaultChecked={num === 5}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                        htmlFor={`${field}-5`}
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            5
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

    