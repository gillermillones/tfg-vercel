import { ItemData } from '@/app/lib/definitions';
import { getSession } from '@/app/lib/actions';

export default function ShowValues({ item }:{ item: ItemData }) {

  return (
    <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
                <th scope="col" className="px-4 py-5 font-small">
                    description
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    quality
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    capacity
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    adaptable
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    interaction
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    motivation
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    design
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    reusable
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    portable
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    toughness
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    structure
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    navigation
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    operable
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    av_accessible
                </th>
                <th scope="col" className="px-3 py-5 font-small">
                    text_accessible
                </th>
            </tr>
        </thead>
        <tbody className="bg-gray-200">
            <tr
                key={i.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.description}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                    {i.quality}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                    {i.capacity}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                    {i.adaptable}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.interaction}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.motivation}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.design}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.reusable}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.portable}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.toughness}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.structure}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.navigation}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.operable}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.av_accessible}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i.text_accessible}
                </td>
            </tr>
        </tbody>
    </table>
  );
}