import { getSession } from '@/app/lib/actions';
import ItemForm from '@/app/ui/items/create-form';
import { Metadata } from 'next';
import { getUserById } from '@/auth';
import { notFound, forbidden } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { FriendListSkeleton } from '@/app/ui/skeletons';
import FriendList from '@/app/ui/dashboard/friend-list';
import { areWeFriends } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'New File',
};

export default async function Page() {
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Your Files</h1>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div className="flex justify-end gap-2">
            <ItemForm ></ItemForm>
        </div>
      </div>
    </div>
  );
}