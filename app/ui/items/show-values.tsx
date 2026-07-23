import { ItemData } from '@/app/lib/definitions';

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
            </tr>
        </thead>
        <tbody className="bg-gray-200">
            <tr
                key={`${item.id}-1`}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.description}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                    {item.quality}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                    {item.capacity}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                    {item.adaptable}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.interaction}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.motivation}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.design}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.reusable}
                </td>
            </tr>
        </tbody>
        <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
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
                key={`${item.id}-2`}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.portable}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.toughness}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.structure}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.navigation}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.operable}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.av_accessible}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.text_accessible}
                </td>
            </tr>
        </tbody>
    </table>
  );
}