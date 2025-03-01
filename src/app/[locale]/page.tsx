import { authOptions } from '@/lib/auth';
import getServerSession from 'next-auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('app');
  const nav = useTranslations('nav');
  const session = getServerSession(authOptions);

  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <h1 className='text-4xl font-bold mb-6'>{t('title')}</h1>
      <p className='text-xl text-gray-600 mb-8'>{t('description')}</p>

      {session ? (
        <Link
          href={`/${locale}/todos`}
          className='px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700'
        >
          {nav('todos')}
        </Link>
      ) : (
        <div className='space-x-4'>
          <Link
            href={`/${locale}/login`}
            className='px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700'
          >
            {nav('login')}
          </Link>
          <Link
            href={`/${locale}/register`}
            className='px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50'
          >
            {nav('register')}
          </Link>
        </div>
      )}
    </div>
  );
}
