const { default: mongoose } = require("mongoose");
const { Balance } = require("../database/schema")



const getBalance = async (req, res) => {
    const userId = req.UserId;
    console.log(req.UserId)
    console.log(req.user)
    console.log({userId});
    const newBalance = await Balance.findOne({userId});

    if(newBalance){
        res.status(200).json({
            balance: newBalance.balance
        })
    }else{
        res.status(411).json({
            msg:`No balance acc associated with user ${userId} found`
        });
    }
};

const transferTransaction = async ( req, res ) => {
    //start the session
    console.log('before session');
    const session = await mongoose.startSession();
    console.log('after session');

    //start the transaction
    console.log('before transaction start');
    session.startTransaction();
    console.log('after transaction start');

    const { to, amount } = req.body;

    console.log("finding user's balance");
    const user = await Balance.findOne({ userId: req.UserId }).session(session);

    if(!user || user.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            msg: "Insufficient balance in your account"
        });
    }

    console.log("finding user amount being sent to balance")
    const userTo = await Balance.findOne({ userId: to }).session(session);

    if(!userTo){
        await session.abortTransaction();
        res.status(400).json({
            msg: "User your trying to send money does not exist"
        });
    }

    console.log("starting acoount updation");
    //performing transaction
    await Balance.updateOne({   userId: req.UserId  }, {    $inc: {    balance: -amount    }}).session(session);
    await Balance.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    console.log("acoount updation done");

    //committing the transaction
    console.log("session being committed");
    await session.commitTransaction();
    console.log("session commited");

    res.status(200).json({
        msg: "Transaction complete"
    });
}

module.exports = { getBalance, transferTransaction };