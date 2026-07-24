import { fetchFriendNumber, fetchUserNumber, fetchItemNumber } from '@/app/lib/data';
import {
  FolderOpenIcon,
  UserGroupIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  files: FolderOpenIcon,
  users: UserGroupIcon,
  friends: HeartIcon,
};

export default async function CardWrapper() {
  const userNum = await fetchUserNumber();
  const friendNum = await fetchFriendNumber();
  const itemNum = await fetchItemNumber();

  return (
    <>
      <Card title="Number of users" value={userNum} type="users" />
      <Card title="Number of files" value={friendNum} type="files" />
      <Card title="Users connected" value={itemNum} type="friends" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'users' | 'friends' | 'files';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
        {value}
      </p>
    </div>
  );
}
