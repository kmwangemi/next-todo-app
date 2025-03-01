import { NextRequest, NextResponse } from 'next/server';
import getServerSession from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { todoSchema } from '@/lib/utils';

// GET /api/todos - Get all todos for the logged in user
export async function GET() {
  const session = getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(todos);
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const json = await request.json();
    const validatedData = todoSchema.parse(json);

    const todo = await prisma.todo.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        userId: session.user.id,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
