export const jwtConstant = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.EXPIRESIN },
};
