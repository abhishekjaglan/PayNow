const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { secret_key } = require('../config');
const { User, Balance }= require('../database/schema');
const { signupValidator, signinValidator, updateUserValidator } = require('../zodValidator');

const signupUser = async(req, res) => {
    const { email, lastName, firstName, password } = req.body;
    const validatedInput = signupValidator.safeParse(req.body)

    if(validatedInput.success){
        if(!email || !lastName || !firstName || !password){
            res.staus(400).json({
                msg:'Input missing, please provide all the inputs'
            });
        }

        const user = await User.findOne({email})

        if(user){
            res.status(411).json({
                msg: "User already registered"
            });
        }

        //hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password: ", hashedPassword);

        const newUser = await User.create({
            email, 
            password:hashedPassword,
            firstName,
            lastName
        });

        if(newUser){
            
            const randomBalance = 1 + Math.random() * 10000;

            const newBalance = await Balance.create({
                userId: newUser._id,
                balance: randomBalance
            });

            const accessToken = jwt.sign({
                user: {
                    email,
                    firstName,
                    lastName,
                    userId: newUser._id,
                }
            }, process.env.JWT_SECRET);

            console.log({accessToken});
            console.log(`New user created: ${newUser}`);
            console.log(req.userId);

            res.status(200).json({
                newUser,
                msg: `New user ${firstName} created !`,
                newBalance,
                msg: `And the associated random balance ${randomBalance}`,
                token: accessToken,
            });

        }else{
            res.status(500).json({
                msg:"Error occured at server side, try again!"
            });
        }

    }else{
        res.json({
            validatedInput
        })
    }  
};

const signinUser = async(req, res) => {
    const { email, password } = req.body;
    const validatedInput = signinValidator.safeParse(req.body);

    if(validatedInput.success){
        if(!email || !password){
            res.status(400).json({
                msg:'Input missing, please provide all the inputs'
            });
        }

        const user = await User.findOne({email});

        if(user){

            if(await bcrypt.compare(password, user.password)){

                const accessToken = jwt.sign({
                    user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        UserId: user._id,
                    }
                }, process.env.JWT_SECRET);

                res.status(200).json({
                    token: accessToken,
                    msg:"Sign in successfull!"
                });

            }else{
                res.status(411).json({
                    msg:'Password does not match, please input again'
                })
            }

        }else{
            res.status(411).json({
                msg: "User does not exist, check email again"
            });
        }
        
    }else{
        res.status(411).json({
            validatedInput,
            msg:'Inputs are wrong, please check again'
        })
    }
};

const updateUser = async (req, res) => {
    const validatedInput = updateUserValidator.safeParse(req.body);
    const email = req.user.email;

    if(validatedInput.success){

        const user = await User.updateOne({email}, req.body);
        console.log({user});

        if(user){
            res.status(200).json({
                user,
                msg: "User Updated!"
            });
        }else{
            res.status(411).json({
                user,
                msg: "Updation failed"
            });
        }
        

    }else{
        res.status(411).json({
            validatedInput,
            msg:"Your input format is wrong, please try again!"
        });
    }

};

const findFriends = async(req, res) => {
    const filter = req.query.filter || "";
    console.log(filter);

    const regexFilter = new RegExp(filter, "i");
    console.log(regexFilter);

    const users = await User.find({
        $or:[{
            firstName: regexFilter,
        },{
            lastName:regexFilter,
        }]
    });
    
    if(users){

        console.log(users);

        // res.status(200).json({
        //     users
        // });
        res.json({
            user: users.map(user => ({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })

    }else{
        res.status(200).json({
            msg:"No users with given query found"
        });
    }
}

module.exports = {  signupUser, signinUser, updateUser, findFriends  }