import EditItemForm from '@/app/ui/items/edit-form';
import { Metadata } from 'next';
import { notFound, forbidden } from 'next/navigation';
import { fetchItemById } from '@/app/lib/data';
import { getSession } from '@/app/lib/actions';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Edit File',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const data = await fetchItemById(id);
    if (!data) {
        notFound();
    }
  
    const session = await getSession();
    if(session.userId.localeCompare(data.user_id) != 0){
        forbidden();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Your Files', href: '/dashboard/files' },
                    {
                        label: 'Edit File',
                        href: `/dashboard/files/${data.id}/edit`,
                        active: true,
                    },
                ]}
            />
            <div className="flex w-full items-center justify-between pt-4">
                <div className="flex justify-end gap-2">
                    <EditItemForm data={data}></EditItemForm>
                </div>
            </div>
        </main>
    );
}