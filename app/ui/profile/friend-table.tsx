import { User } from '@/app/lib/definitions';
import { RemoveFriend } from '@/app/ui/friends/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import Pagination from '@/app/ui/pagination';
import ItemsTable from '@/app/ui/items/table';
import { ItemTableSkeleton } from '@/app/ui/skeletons';
import { fetchItemPagesUserId, fetchFilteredItemsUserId } from '@/app/lib/data';
import { getSession } from '@/app/lib/actions';

export default async function FriendProfileTable({ user }: { user: User }) {
    const query = '';
    const currentPage = 1;
    const session = await getSession();
    const totalPages = await fetchItemPagesUserId(query, user.id);
    const items = await fetchFilteredItemsUserId(query, currentPage, user.id);

  return (
    <div className="flex flex-col w-full justify-between">
        <div className="flex flex-row w-full items-center justify-between pt-4">
            <h1 className={`${lusitana.className} text-2xl`}>{user?.name}'s Profile Page</h1>
            <div className="flex justify-end gap-2">
                <RemoveFriend id={user?.id} />
            </div>
        </div>
        <div>
            <h2>Email: {user?.email}</h2>
            <h2>User ID:{user?.id}</h2>
        </div>
        <h1 className={`${lusitana.className} mt-4 text-2xl`}>{user?.name}'s Public Files</h1>
        <Suspense key={query + currentPage} fallback={<ItemTableSkeleton />}>
            <ItemsTable items={items} idSession={session.userId} idUser={user.id}/>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>
    </div>
  );
}