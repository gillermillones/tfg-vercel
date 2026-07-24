'use client'

import { UpdateItem, DeleteItem } from '@/app/ui/items/buttons';
import { ChevronRightIcon, ChevronDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react'
import ShowValues from '@/app/ui/items/show-values';
import { ItemData } from '@/app/lib/definitions';
import generateXml from '@/app/lib/export-xml';

export default function ItemsTable({
  items,
  idSession,
  idUser,
}: {
  items: ItemData[];
  idSession: string;
  idUser: string;
}) {
  const [state, setState] = useState<string | null>(null);
  const changeState = (itemId : string) => {setState(state === itemId ? null : itemId)}

  const download = async (id: string) => {
    const xmlData = await generateXml(id);
    const a = document.createElement("a");
    a.href = xmlData;
    a.download = id + ".xml";
    a.click();
    a.remove();
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {items?.map((i) => (
              <div
                key={i.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{i.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{i.extension}</p>
                    <p className="text-sm text-gray-500">{i.summary}</p>
                  </div>
                </div>
                {idSession.localeCompare(idUser) == 0 ? (
                    <div className="flex w-full items-center justify-between pt-4">
                        <div className="flex justify-end gap-2">
                          <UpdateItem id={i.id} />
                          <DeleteItem id={i.id} />
                        </div>
                    </div>
                    ):(
                      <></>
                    )}
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  File name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  File extension
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  File description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Values
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items?.map((i) => (
                <>
                <tr
                  key={i.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{i.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {i.extension}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {i.summary}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {state === i.id ? (
                      <button onClick={() => changeState(i.id)} className="rounded-md border p-2 bg-white hover:bg-gray-200">
                        <ChevronDownIcon className="w-5" />
                      </button>
                      ):(
                        <button onClick={() => changeState(i.id)} className="rounded-md border p-2 bg-white hover:bg-gray-200">
                          <ChevronRightIcon className="w-5" />
                        </button>
                      )}
                  </td>
                  {idSession.localeCompare(idUser) == 0 ? (
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => download(i.id)} className="rounded-md border p-2 bg-white hover:bg-gray-200">
                          <ArrowDownTrayIcon className="w-5" />
                        </button>
                        <UpdateItem id={i.id} />
                        <DeleteItem id={i.id} />
                      </div>
                    </td>
                    ):(
                        <></>
                    )}
                </tr>
                {state === i.id && (
                  <tr>
                    <td colSpan={idSession.localeCompare(idUser) == 0 ? 5 : 4}>
                      <ShowValues item={i} />
                    </td>
                  </tr>
                )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}