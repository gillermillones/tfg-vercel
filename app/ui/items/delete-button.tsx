'use server';

import { deleteItem } from '@/app/lib/actions';

export async function deleteItemAction(id: string) {
  await deleteItem(id);
}
