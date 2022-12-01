export interface UserSchema {
  id?: string;
  userId: string;
  tabnewsUser?: {
    id?: string;
    username?: string;
    session: {
      id: string;
      token: string;
      createdAt: Date;
      updatedAt: Date;
      expiresAt: Date;
    }
  }
}
