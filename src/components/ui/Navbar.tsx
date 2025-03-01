'use client';

import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../locale/LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const { data: session } = useSession();
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname.split('/')[1];

  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link
              href={`/${locale}`}
              className='flex-shrink-0 flex items-center'
            >
              {t('app.title')}
            </Link>
            <div className='ml-10 flex items-center space-x-4'>
              <Link
                href={`/${locale}`}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === `/${locale}`
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('home')}
              </Link>
              {session && (
                <Link
                  href={`/${locale}/todos`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.includes('/todos')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('todos')}
                </Link>
              )}
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <LanguageSwitcher />
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100'
              >
                {t('logout')}
              </button>
            ) : (
              <>
                <Link
                  href={`/${locale}/login`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.includes('/login')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('login')}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.includes('/register')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
