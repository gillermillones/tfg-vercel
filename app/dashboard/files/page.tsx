import { Metadata } from 'next';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import { ItemTableSkeleton } from '@/app/ui/skeletons';
import { CreateItem } from '@/app/ui/items/buttons';
import { fetchItemPagesUserId, fetchFilteredItemsUserId } from '@/app/lib/data';
import { getSession } from '@/app/lib/actions';
import Pagination from '@/app/ui/pagination';
import ItemsTable from '@/app/ui/items/table';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
    title: 'Files',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const session = await getSession();
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchItemPagesUserId(query, session.userId);
    const items = await fetchFilteredItemsUserId(query, currentPage, session.userId);
    
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Your Files</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search a file..." />
                <CreateItem />
            </div>
            <Suspense key={query + currentPage} fallback={<ItemTableSkeleton />}>
                <ItemsTable items={items} idSession={session.userId} idUser={session.userId}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}