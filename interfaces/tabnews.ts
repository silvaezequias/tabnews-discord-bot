export enum Features {
  'create:user',
  'read:user',
  'read:session',
  'read:content',
  'read:user:self',
  'read:user:list',
  'read:migration',
  'read:content:list',
  'read:recovery_token',
  'read:activation_token',
  'read:content:tabcoins',
  'read:email_confirmation_token',
  'create:session',
  'create:content',
  'create:migration',
  'create:content:text_root',
  'create:content:text_child',
  'update:user',
  'update:content',
  'update:content:others',
  'ban:user',
}
type BaseUser = {
  id: string;
  username: string;
  features: Features[];
  tabcoins: number;
  tabcash: number;
  created_at: Date;
  updated_at: Date;
}

type AuthenticatedUser = {
  email: string;
  notifications: string;
} & BaseUser

export type User<Auth = false> = (
  Auth extends true ? AuthenticatedUser : BaseUser
);

export type ContentsRequestQuery = {
  page?: number;
  per_page?: number;
  strategy?: 'new' | 'old' | 'relevant';
}

export type RequestError = {
  name?: string;
  message?: string;
  action?: string;
  error_id?: string;
  status_code?: number;
  error_location_code?: number;
  key?: string;
  type?: string;
}

export interface Sessions {
  id: string;
  token: string;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Content {
  id: string;
  owner_id: string;
  parent_id?: string;
  slug: string;
  title?: string;
  body?: string;
  status: ('draft' | 'published');
  source_url: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  published_at: Date;
  owner_username: string;
  tabcoins: number;
  children_deep_count: number;
}
