import passportGithub from 'passport-github'
import passport from 'passport'
import cookieSession from 'cookie-session'
import Queries from '../queries'
import Commands from '../commands'

export const sessionMiddleware = cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY],
})

const findOrCreateUserFromGithubProfile = (accessToken, refreshToken, profile, callback) => {
  console.log('??', githubProfile)
  const github_id = githubProfile.id
  const userAttributes = {
    github_id: github_id,
    name: githubProfile.displayName,
    email: githubProfile.emails[0].value,
    avatar_url: githubProfile.photos[0].value,
  }
  return knex
    .table('users')
    .where('github_id', github_id)
    .first('*')
    .then(user => {
        user ? user : createUser(userAttributes)
    })
    .then(user => {
      callback(done)
    })
}

passport.use(new passportGithub.Strategy({
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:  process.env.GITHUB_CALLBACK,
  },
  function(accessToken, refreshToken, profile, callback){
    (new Commands).findOrCreateUserFromGithubProfile(profile)
      .then(user => {
        callback(null, user)
      })
      .catch(error => {
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
