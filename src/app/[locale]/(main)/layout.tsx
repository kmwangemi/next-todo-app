import Navbar from '@/components/ui/Navbar';
import SessionProviderWrapper from '@/components/SessionProviderWrapper'; // ✅ Use a separate client component

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <SessionProviderWrapper>
      {' '}
      {/* ✅ Wrap children with SessionProvider in a Client Component */}
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          {children}
        </main>
        <footer className='bg-white shadow-inner mt-auto py-4'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <p className='text-center text-sm text-gray-500'>
              © {new Date().getFullYear()} Todo App
            </p>
          </div>
        </footer>
      </div>
    </SessionProviderWrapper>
  );
}