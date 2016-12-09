import express from 'express'
import passport from 'passport'
// import {queries, commands} from '../database'
const router = new express.Router()

const GitHubStrategy = require('passport-github').Strategy

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK,
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('GITHUB LOGIN?', accessToken, refreshToken, profile)
    cb(undefined, {id: 1234});
    // database.commands.findOrCreateUserFromGithubProfile
    // findOrCreateUserFromGithubProfile(profile).then, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


router.get('/login', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router
