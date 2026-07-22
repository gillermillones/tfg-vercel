import ItemForm from '@/app/ui/items/create-form';
import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'New File',
};

export default async function Page() {
  
  return (
    <main>
      <Breadcrumbs
          breadcrumbs={[
              { label: 'Your Files', href: '/dashboard/files' },
              {
                  label: 'New File',
                  href: '/dashboard/files/create',
                  active: true,
              },
          ]}
       />
      <div className="flex w-full items-center justify-between pt-4">
        <div className="flex justify-end gap-2">
            <ItemForm />
        </div>
      </div>
    </main>
  );
}