import { getSession } from '@/app/lib/actions';

export default async function Page() {
  const session = await getSession();

  return (
    <div>
      <p>Profile Page</p>
      <h1>{session.email}</h1>
    </div>
  );
}