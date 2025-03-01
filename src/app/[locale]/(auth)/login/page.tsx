import LoginForm from '@/components/auth/LoginForm';
import { authOptions } from '@/lib/auth';
import getServerSession from 'next-auth';
import { redirect } from 'next/navigation';

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = getServerSession(authOptions);

  if (session) {
    redirect(`/${locale}/todos`);
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
      <LoginForm locale={locale} />
    </div>
  );
}
