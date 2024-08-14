const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use( new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (username, password, done) => {
        const q = await User 
            .findOne({ email: username })
            .exec();
        
            console.log(q)

            if(!q) { // if DB returned no records, the user doesn't exist
                return done(null, false, {message: 'Incorrect Username'});
            }
            if(!q.validPassword(password)) { //validate password
                return done(null, false, { message: 'Incorrect Password'});
            }
            return done(null, q); // everythin is ok, return user object
    }
));