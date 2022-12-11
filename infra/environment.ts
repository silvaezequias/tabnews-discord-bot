export function isProduction(): boolean {
  return process.env.NODE_ENV && process.env.NODE_ENV != 'development';
}

export default {
  isProduction,
  get type() {
    return isProduction() ? 'production' : 'development';
  }
};
