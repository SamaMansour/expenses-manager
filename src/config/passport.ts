import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';
import { comparePassword } from '../utils/auth';
import bcrypt from 'bcryptjs';

passport.use(new LocalStrategy({
    usernameField: 'email', // Use 'email' instead of the default 'username'
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
  
// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id: any, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;



