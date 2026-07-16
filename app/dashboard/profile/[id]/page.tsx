import { getSession } from '@/app/lib/actions';
import { Metadata } from 'next';
import { getUserById } from '@/auth';

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
    return (
      <div>
        <p>Your Profile Page</p>
        <h1>{session.email}</h1>
        <h1>{session.userId}</h1>
      </div>
    );
  }
  return (
    <div>
      <p>{user?.name}'s Profile Page</p>
      <h1>{user?.email}</h1>
      <h1>{user?.id}</h1>
    </div>
  );
}