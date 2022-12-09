import { Content, ContentsRequestQuery, RequestError, Sessions, User } from 'interfaces';
import environment from 'infra/environment';
import fetch from 'node-fetch';
import { ServiceError } from 'errors';

function getHeaders(options = {}) {
  return {
    'Content-Type': 'application/json',
    ...options,
  }
}

const endpoints = {
  sessions: `${getApiUrl()}/sessions`,
  user: `${getApiUrl()}/user`,
  users: `${getApiUrl()}/users`,
  contents: `${getApiUrl()}/contents`,
}

export function getWebsiteUrl() {
  if (environment.isProduction()) {
    return 'https://tabnews.com.br';
  } else {
    return 'https://tabnews.com.br';
    // Nenhum hambiente de homologação está dispónível no momento
  };
}

export function getApiUrl() {
  return getWebsiteUrl() + '/api/v1';
}

export async function createSession({ email, password }) {
  const response = await fetch(endpoints.sessions, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (response.status === 404) {
    throw new ServiceError({
      action: 'Tente novamente mais tarde.',
      log: false,
    });
  }

  const responseBody = await response.json() as Sessions;

  return 'error_id' in responseBody
    ? { error: responseBody as RequestError }
    : { data: responseBody };
};

export async function getUserBySessionToken(sessionToken: string) {
  const response = await fetch(endpoints.user, {
    headers: getHeaders({
      cookie: `session_id=${sessionToken}`,
    })
  });

  if (response.status === 404) {
    throw new ServiceError({
      action: 'Tente novamente mais tarde.',
      log: false,
    });
  }

  const responseBody = await response.json() as User<true>;

  return 'error_id' in responseBody
    ? { error: responseBody as RequestError }
    : { data: responseBody };
};

export async function getUserByUsername(username: string) {
  const response = await fetch(endpoints.users + `/${username}`, {
    headers: getHeaders()
  });

  if (response.status === 404) {
    throw new ServiceError({
      action: 'Tente novamente mais tarde.',
      log: false,
    });
  }

  const responseBody = await response.json() as User;

  return 'error_id' in responseBody
    ? { error: responseBody as RequestError }
    : { data: responseBody };
}

export async function getContentsByUser(user: User) {
  const response = await fetch(endpoints.contents + `/${user.username}`, {
    headers: getHeaders(),
  });

  if (response.status === 404) {
    throw new ServiceError({
      action: 'Tente novamente mais tarde.',
      log: false,
    });
  };

  const responseBody = await response.json() as Content[];

  return 'error_id' in responseBody
    ? { error: responseBody as RequestError }
    : { data: responseBody };
};

export async function getContents(query: ContentsRequestQuery = {
  page: 1,
  per_page: 30,
  strategy: 'relevant'
}) {
  const stringQueries = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`);

  const response = await fetch(endpoints.contents + `?${stringQueries.join('&')}`, {
    headers: getHeaders()
  });

  if (response.status === 404) {
    throw new ServiceError({
      action: 'Tente novamente mais tarde.',
      log: false,
    });
  };

  const responseBody = await response.json() as Content[];

  return 'error_id' in responseBody
    ? { error: responseBody as RequestError }
    : { data: responseBody };
};

export async function getContentBySlug(ownerUsername: string, slug: string) {
  const response = await fetch(`${endpoints.contents}/${ownerUsername}/${slug}`, {
    headers: getHeaders(),
  });

  if (response.status === 404) {
    throw new ServiceError({
      action: 'Tente novamente mais tarde.',
      log: false,
    });
  };

  const responseBody = await response.json() as Content;

  return 'error_id' in responseBody
    ? { error: responseBody as RequestError }
    : { data: responseBody };
}

export async function getContentChildren(ownerUsername: string, slug: string) {
  const response = await fetch(`${endpoints.contents}/${ownerUsername}/${slug}/children`, {
    headers: getHeaders(),
  });

  if (response.status === 404) {
    throw new ServiceError({
      action: 'Tente novamente mais tarde.',
      log: false,
    });
  };

  const responseBody = await response.json() as Content;

  return 'error_id' in responseBody
    ? { error: responseBody as RequestError }
    : { data: responseBody };
};


export default {
  getApiUrl,
  getWebsiteUrl,
  createSession,
  getUserBySessionToken,
  getUserByUsername,
  getContentsByUser,
  getContents,
  getContentBySlug,
  getContentChildren,
}