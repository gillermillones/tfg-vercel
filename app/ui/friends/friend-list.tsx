import { RemoveFriend, AcceptFriend, DismissFriend } from '@/app/ui/friends/buttons';
import Image from 'next/image';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { User } from '@/app/lib/definitions';
import { fetchFriends, fetchFriendRequests } from '@/app/lib/data';

export default async function FriendList({ id }: { id: string }) {
    const friends = await fetchFriends(id);
    const friendRequests = await fetchFriendRequests(id);

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Your friends
            </h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className="bg-white px-6">
                    {friends.map((friend) => (
                        <div key={friend.id} className='flex flex-row items-center justify-between py-4'>
                            <div className="flex items-center">
                                <div className="min-w-0">
                                    <Link href={`/dashboard/profile/${friend.id}`}>
                                        <p className="truncate text-sm font-semibold md:text-base">
                                        {friend.name}
                                        </p>
                                        <p className="hidden text-sm text-gray-500 sm:block">
                                        {friend.email}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-between pt-4">
                                <div className="flex justify-end gap-2">
                                    <RemoveFriend id={friend.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                    {friendRequests.map((friend) => (
                        <div key={friend.id} className='flex flex-row items-center justify-between py-4'>
                            <div className="flex items-center">
                                <div className="min-w-0">
                                    <Link href={`/dashboard/profile/${friend.id}`}>
                                        <p className="truncate text-sm font-semibold md:text-base">
                                        {friend.name}
                                        </p>
                                        <p className="hidden text-sm text-gray-500 sm:block">
                                        {friend.email}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-between pt-4">
                                <div className="flex justify-end gap-2">
                                    <AcceptFriend id={friend.id} />
                                    <DismissFriend id={friend.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}