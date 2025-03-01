import TodoList from '@/components/todo/TodoList';
import { authOptions } from '@/lib/auth';
import getServerSession from 'next-auth';
import { redirect } from 'next/navigation';

export default function TodosPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <TodoList locale={locale} />
    </div>
  );
}
