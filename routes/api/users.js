const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bCrypt = require('bcryptjs');
//Load User Model
const User = require('../../models/Users');

// @route    GET api/users/test
// @desc     Tests users route
// @access   public
router.get('/test', (req, res, next) => res.json({msg: "Users Works"}));


// @route    GET api/users/register
// @desc     Register user
// @access   public
router.get('/register', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({email: 'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg', // rating
                    d: 'mm' // default
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });
                
                bCrypt.genSalt(10, (err, salt) => {
                    bCrypt.hash(newUser.password , salt , (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});


module.exports = router;