import database from 'infra/database';
import { User } from '@prisma/client';
import { Sessions, UserSchema } from 'interfaces';

async function insertSession(userId: string, session: Sessions) {
  var dataObject: UserSchema = {
    userId: userId,
    tabnewsUser: {
      session: {
        id: session.id,
        token: session.token,
        updatedAt: session.updated_at,
        expiresAt: session.expires_at,
        createdAt: session.created_at,
      }
    },
  };

  return await database.user.upsert({
    where: { userId },
    create: dataObject,
    update: dataObject
  });
}

async function getOneById(userId: string) {
  const foundUser = await database.user.findFirst({
    where: { userId }
  });
  return foundUser;
}

async function create(userObject: User & UserSchema) {
  var createdUser = await database.user.create({
    data: userObject
  });
  return createdUser;
}

async function update(userId: string, userObject: UserSchema) {
  var updatedUser = await database.user.update({
    where: { userId },
    data: userObject
  });
  return updatedUser;
};

export default {
  insertSession,
  getOneById,
  create,
  update,
}