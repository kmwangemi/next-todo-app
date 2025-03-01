import getServerSession from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import TodoForm from '@/components/todo/TodoForm';
import { getTranslations } from 'next-intl/server';

export default async function EditTodoPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/${locale}/login`);
  }

  const t = await getTranslations({ locale, namespace: 'todos.form' });

  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo || todo.userId !== session.user.id) {
    redirect(`/${locale}/todos`);
  }

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6'>{t('update')}</h1>
      <TodoForm
        locale={locale}
        todoId={id}
        initialData={{
          title: todo.title,
          description: todo.description || '',
        }}
      />
    </div>
  );
}
