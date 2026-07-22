import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { getSession } from '@/app/lib/actions';

export default async function Forbidden() {
  const session = await getSession();

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">403 Forbidden</h2>
      <p>You have no access to the requested profile.</p>
      <Link
        href={`/dashboard/profile/${session.userId}`}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}