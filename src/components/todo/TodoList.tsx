'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export default function TodoList({ locale }: { locale: string }) {
  const t = useTranslations('todos');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError('Failed to load todos');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const toggleTodoStatus = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className='text-center py-8'>{t('common.loading')}</div>;
  }

  if (error) {
    return <div className='text-red-500 text-center py-8'>{error}</div>;
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>{t('title')}</h1>
        <Link
          href={`/${locale}/todos/new`}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        >
          {t('createNew')}
        </Link>
      </div>

      {todos.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>{t('empty')}</div>
      ) : (
        <div className='space-y-4'>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
              onToggleStatus={toggleTodoStatus}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
