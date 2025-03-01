'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '../../../i18n.config';

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';

    const segments = pathName.split('/');
    segments[1] = locale;

    return segments.join('/');
  };

  return (
    <div className='flex gap-2'>
      {i18n.locales.map(locale => (
        <button
          key={locale}
          onClick={() => router.push(redirectedPathName(locale))}
          className={`px-3 py-1 rounded-md text-sm ${
            pathName.includes(`/${locale}`)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
