/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { TodoData, todoSchema } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type TodoFormProps = {
  locale: string;
  todoId?: string;
  initialData?: TodoData;
};

export default function TodoForm({
  locale,
  todoId,
  initialData,
}: TodoFormProps) {
  const t = useTranslations('todos.form');
  const common = useTranslations('common');
  const router = useRouter();
  const isEditing = !!todoId;

  const [formData, setFormData] = useState<TodoData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
  });
  const [errors, setErrors] = useState<Partial<TodoData>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = todoSchema.parse(formData);
      setErrors({});
      setIsLoading(true);

      const url = isEditing ? `/api/todos/${todoId}` : '/api/todos';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save todo');
      }

      router.push(`/${locale}/todos`);
      router.refresh();
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Partial<TodoData> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof TodoData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700'
        >
          {t('title')}
        </label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : ''
          }`}
        />
        {errors.title && (
          <p className='mt-1 text-sm text-red-600'>{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
        >
          {t('description')}
        </label>
        <textarea
          id='description'
          name='description'
          rows={4}
          value={formData.description || ''}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
        />
      </div>

      <div className='flex justify-end space-x-3'>
        <button
          type='button'
          onClick={() => router.back()}
          className='py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          {common('cancel')}
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className='py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
        >
          {isLoading
            ? common('loading')
            : isEditing
            ? t('update')
            : t('create')}
        </button>
      </div>
    </form>
  );
}
