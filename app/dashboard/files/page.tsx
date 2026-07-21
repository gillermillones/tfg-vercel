import { Metadata } from 'next';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { CreateItem } from '@/app/ui/items/buttons';
import { fetchItemPages } from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';
import ItemsTable from '@/app/ui/items/table';

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
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchItemPages(query);
  
  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Your Files</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search a file..." />
            <CreateItem />
        </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
            <ItemsTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>
    </div>
  );
}