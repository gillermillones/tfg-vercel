import { User } from '@/app/lib/definitions';
import { RemoveFriend } from '@/app/ui/friends/buttons';
import { lusitana } from '@/app/ui/fonts';

export default async function FriendProfileTable({ user }: { user: User }) {

  return (
    <div className="flex flex-col w-full justify-between">
        <div className="flex flex-row w-full items-center justify-between pt-4">
            <h1 className={`${lusitana.className} text-2xl`}>{user?.name}'s Profile Page</h1>
            <div className="flex justify-end gap-2">
                <RemoveFriend id={user?.id} />
            </div>
        </div>
        <div>
            <h1>Email: {user?.email}</h1>
            <h1>User ID:{user?.id}</h1>
        </div>
    </div>
  );
}