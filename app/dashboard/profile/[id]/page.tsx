import { getSession } from '@/app/lib/actions';
import { Metadata } from 'next';
import { getUserById } from '@/auth';
import { notFound, forbidden } from 'next/navigation';
import OwnProfileTable from '@/app/ui/profile/table';
import FriendProfileTable from '@/app/ui/profile/friend-table';
import UnknownProfileTable from '@/app/ui/profile/unknown-table';
import { areWeFriends } from '@/app/lib/data';

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
  const friendship = await areWeFriends(session.userId, id);
  
  if(session.userId.localeCompare(user?.id) == 0){
    return (
      <div className="w-full">
        <OwnProfileTable session={session} />
      </div>
    );
  }else if(friendship == true){
    return (
      <div className="w-full">
        <FriendProfileTable user={user} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <UnknownProfileTable user={user} />
    </div>
  );
}