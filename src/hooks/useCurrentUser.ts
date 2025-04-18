'use server';

import { User } from '@prisma/client';
import { useClerkUser } from './userClerkUser';
import prisma from '@/lib/prisma';

export const getCurrentUser = async (): Promise<User> => {
  const clerk = await useClerkUser();
  const user = await prisma.user.findUnique({
    where: { clerkId: clerk.id },
  });

  if (!user) {
    throw new Error('User not found in database');
  }

  return user;
};

export const useCurrentUser = async (): Promise<User> => {
  return await getCurrentUser();
};
