import passportGithub from 'passport-github'
import passport from 'passport'
import cookieSession from 'cookie-session'
import queries from '../queries'
import commands from '../commands'

export const sessionMiddleware = cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY],
})

const findOrCreateUserFromGithubProfile = (accessToken, refreshToken, profile, cb) => {
  cb(null, {FAKE_USER: 42})
  // commands.findOrCreateUserFromGithubProfile(profile)
  //   .then(user => {
  //     cb(undefined, user);
  //   })
  //   .catch(error => {
  //     cb(error)
  //   })
}

passport.use(new passportGithub.Strategy({
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:  process.env.GITHUB_CALLBACK,
  },
  findOrCreateUserFromGithubProfile
));

passport.serializeUser(function(user, done) {
  done(null, {id: user.id});
});

passport.deserializeUser(function(user, done) {
  queries.getUserById(user.id)
    .then( user  => done(null, user))
    .catch(error => done(error))
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
