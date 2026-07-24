import { User } from '@/app/lib/definitions';
import { AddFriend, RemoveFriend } from '@/app/ui/friends/buttons';
import { lusitana } from '@/app/ui/fonts';

export default async function UnknownProfileTable({ user, requested }: { user: User; requested: boolean }) {

  return (
    <div className="flex flex-col w-full justify-between">
        <div className="flex flex-row w-full items-center justify-between pt-4">
            <h1 className={`${lusitana.className} text-2xl`}>{user?.name}'s Profile Page</h1>
                {requested ? (
                    <div className="flex justify-end gap-2">
                        <p className="pt-1">Already sent request</p>
                        <RemoveFriend id={user.id} />
                    </div>
                ):(
                    <div className="flex justify-end gap-2">
                        <AddFriend id={user?.id} />
                    </div>
                )}
        </div>
        <div>
            <h1>Email: {user?.email}</h1>
            <h1>User ID:{user?.id}</h1>
        </div>
    </div>
  );
}