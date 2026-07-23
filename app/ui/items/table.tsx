import { UpdateItem, DeleteItem } from '@/app/ui/items/buttons';
import { fetchFilteredItemsUserId } from '@/app/lib/data';
import { getSession } from '@/app/lib/actions';

export default async function ItemsTable({
  query,
  currentPage,
  id,
}: {
  query: string;
  currentPage: number;
  id: string;
}) {
  const session = await getSession();
  const items = await fetchFilteredItemsUserId(query, currentPage, id);

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
                {session.userId.localeCompare(id) == 0 ? (
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
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items?.map((i) => (
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
                  {session.userId.localeCompare(id) == 0 ? (
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateItem id={i.id} />
                        <DeleteItem id={i.id} />
                      </div>
                    </td>
                    ):(
                        <></>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
