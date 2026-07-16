import { getSession } from '@/app/lib/actions';
import { Metadata } from 'next';
import { getUserById } from '@/auth';
import { notFound, forbidden } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import { fetchFriends } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const user = await getUserById(id);
  if (!user) {
    notFound();
  }
  const session = await getSession();
  
  if(session.userId.localeCompare(user?.id) == 0){
    const friends = await fetchFriends(session.userId);

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Your Profile Page</h1>
        </div>
        <div>
          <h1>Email: {session.email}</h1>
          <h1>User ID:{session.userId}</h1>
          <h1>User Friends:</h1>
          {friends.map((friend) => (
            <p>{await getUserById(friend.userIdTarget)?.name}</p>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{user?.name}'s Profile Page</h1>
      </div>
      <div>
        <h1>Email: {user?.email}</h1>
        <h1>User ID:{user?.id}</h1>
      </div>
    </div>
  );
}