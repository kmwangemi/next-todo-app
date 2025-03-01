'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TodoItemProps = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  onToggleStatus: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({
  id,
  title,
  description,
  completed,
  onToggleStatus,
  onDelete,
}: TodoItemProps) {
  const t = useTranslations('todos.actions');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <div
      className={`border rounded-lg p-4 ${
        completed ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            checked={completed}
            onChange={() => onToggleStatus(id, !completed)}
            className='h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
          />
          <h3
            className={`ml-3 text-lg font-medium ${
              completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {title}
          </h3>
        </div>
        <div className='flex space-x-2'>
          <Link
            href={`/${locale}/todos/${id}`}
            className='text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200'
          >
            {t('edit')}
          </Link>
          <button
            onClick={() => onDelete(id)}
            className='text-sm px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200'
          >
            {t('delete')}
          </button>
        </div>
      </div>
      {description && (
        <p
          className={`mt-2 text-gray-600 pl-7 ${
            completed ? 'text-gray-400' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
