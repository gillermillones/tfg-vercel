import { PlusIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';
import { removeFriend, addFriend, acceptFriend, dismissFriend } from '@/app/lib/actions';

export function AddFriend({ id }: { id: string | undefined}) {

    return (
    <form action={async () => {
      'use server';
      await addFriend(id);
    }}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Add Friend</span>
        <PlusIcon className="h-5 md:ml-4" />
      </button>
    </form>
  );
}

export function AcceptFriend({ id }: { id: string }) {
  
    return (
    <form action={async () => {
      'use server';
      await acceptFriend(id);
    }}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Accept Friend</span>
        <CheckIcon className="h-5 md:ml-4" />
      </button>
    </form>
  );
}

export function RemoveFriend({ id }: { id: string | undefined }) {
    
  return (
    <form action={async () => {
      'use server';
      await removeFriend(id);
    }}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Remove Friend</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}

export function DismissFriend({ id }: { id: string }) {
    
  return (
    <form action={async () => {
      'use server';
      await dismissFriend(id);
    }}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Dismiss Friend</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}