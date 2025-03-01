import TodoForm from '@/components/todo/TodoForm';
import { authOptions } from '@/lib/auth';
import getServerSession from 'next-auth';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';

export default function CreateTodoPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('todos.form');
  const session = getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6'>{t('create')}</h1>
      <TodoForm locale={locale} />
    </div>
  );
}
