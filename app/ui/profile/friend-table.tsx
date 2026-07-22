import { User } from '@/app/lib/definitions';
import { RemoveFriend } from '@/app/ui/friends/buttons';
import { lusitana } from '@/app/ui/fonts';

export default async function FriendProfileTable({ user }: { user: User }) {

  return (
    <div className="flex flex-col w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{user?.name}'s Profile Page</h1>
        <div>
            <h1>Email: {user?.email}</h1>
            <h1>User ID:{user?.id}</h1>
        </div>
        <div className="flex w-full items-center justify-between pt-4">
            <div className="flex justify-end gap-2">
                <RemoveFriend id={user?.id} />
            </div>
        </div>
    </div>
  );
}