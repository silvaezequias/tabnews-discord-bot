/* eslint-disable no-constant-condition */
import { Event } from 'interfaces';
import { readFileSync, PathLike } from 'fs';
import environment from 'infra/environment';

export default {
  name: 'ready',
  run: (client) => {
    if (!environment.isProduction() || true) return;

    const avatarPaths: PathLike[] = [
      '../assets/angry-face.png',
      '../assets/dead-face.png',
      '../assets/distrusting-face.png',
      '../assets/love-face.png',
      '../assets/normal-face.png',
      '../assets/sleepy-face.png',
      '../assets/unamused-face.png',
      '../assets/woozy-face.png'
    ];

    async function setNewAvatar(path: PathLike) {
      const avatarBuff = readFileSync(path);
      await client.user.setAvatar(avatarBuff);
    }

    setInterval(async function () {
      const randomNumber = Math.round(Math.random() * avatarPaths.length);
      const randomAvatarPath = avatarPaths[randomNumber];

      await setNewAvatar(randomAvatarPath);
    }, 60 * 1000 * 60 * 2); // A cada 2 horas
  }
} as Event;
