import passportGithub from 'passport-github'
import passport from 'passport'
import cookieSession from 'cookie-session'
import { findOrCreateUserFromGithubProfile } from '../commands'

export const sessionMiddleware = cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY],
})

passport.use(new passportGithub.Strategy({
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:  process.env.GITHUB_CALLBACK,
  },
  function(accessToken, refreshToken, profile, callback){
    findOrCreateUserFromGithubProfile(profile)
      .then(user => {
        console.log('-=-=-=-= PASSPORT -=-=-=-=-= GOOD', user)
        callback(null, user)
      })
      .catch(error => {
        console.log('-=-=-=-= PASSPORT -=-=-=-=-= BAD', error)
        callback(error)
      })
  }
));

passport.serializeUser(function(user, done) {
  done(null, {id: user.id});
});

passport.deserializeUser(function(user, done) {
  done(null, user)
});


export default webServer => {
  webServer.use(sessionMiddleware)
  webServer.use(passport.initialize());
  webServer.use(passport.session());
  webServer.get('/login', passport.authenticate('github'));
  webServer.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) { res.redirect('/'); }
  );
}
