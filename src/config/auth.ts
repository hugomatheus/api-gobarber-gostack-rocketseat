const config = {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
export default config;
