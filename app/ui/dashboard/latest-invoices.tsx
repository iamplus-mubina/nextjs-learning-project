import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';

//  Function to get correct image path from customer name
const getCustomerImage = (name: string): string => {
  const nameLower = name.toLowerCase();
  
  // Map customer names to available image files
  if (nameLower.includes('lee robinson')) {
    return '/customers/lee-robinson.png';
  }
  if (nameLower.includes('de oliveira') || nameLower.includes('disha')) {
    return '/customers/delba-de-oliveira.png';
  }
  if (nameLower.includes('emil') || nameLower.includes('kowalski')) {
    return '/customers/balazs-orban.png';
  }
  if (nameLower.includes('jared') || nameLower.includes('palmer')) {
    return '/customers/amy-burns.png';
  }
  if (nameLower.includes('tom') || nameLower.includes('occhino')) {
    return '/customers/michael-novotny.png';
  }
  
  // Default fallback image
  return '/customers/evil-rabbit.png';
};

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            //  Get correct image path
            const imagePath = getCustomerImage(invoice.name);
            
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={imagePath} // Use corrected path
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                    // REMOVE onError handler - Server components can't have event handlers
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}