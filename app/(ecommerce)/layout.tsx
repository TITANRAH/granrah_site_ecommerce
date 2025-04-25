import { ReactNode } from 'react';
// import { redirect } from 'next/navigation';
// import { getServerSession } from 'next-auth';

export default async function EcommerceLayout({ children }: { children: ReactNode }) {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect('/auth/signin');
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
} 