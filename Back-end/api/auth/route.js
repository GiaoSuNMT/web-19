const express = require('express');
const router = express.Router();
const Nexmo = require("nexmo");
const UserModel = require("./model")
const nodemailer = require("nodemailer")
const FB = require('fb');
const nexmo = new Nexmo({
    apiKey: '7f1a9393',
    apiSecret: 'HG21oDgHWTfVvmnK'
})
//setting fb
FB.options({ version: 'v3.2' });
//get session
router.get("/getId", async (req, res) => {
    if (req.session.user) {
        const _id = req.session.user._id;
        const user = await UserModel.findById(_id).exec();
        res.status(200).json({ user: user  });
    }
    else
        res.status(200).json({ logout : true });
})
// check login
router.get("/isLoggin", async (req, res) => {
    let check = false;
    if (req.session.user) check = true;
    res.status(200).json({ check: check })
})
//loginfb
router.post("/loginfb", async (req, res) => {
    try {
        const checkUser = await UserModel.findOne({ fbId: req.body.userFb.fbId }).exec();
        if (checkUser) {
            await UserModel.updateOne({ _id: checkUser._id }, { $set: { accessToken: req.body.userFb.accessToken } });
            const acctoken = req.body.userFb.accessToken;
            FB.setAccessToken(acctoken);
            await FB.api(
                '/me',
                'GET',
                { "fields": "gender,birthday" },
                async function (response) {
                    await UserModel.updateOne({ _id: checkUser._id }, { $set: { age: Number(new Date().getFullYear() - new Date(response.birthday).getFullYear()), birthday: new Date(response.birthday) } });
                }
            )
            req.session.user = {
                _id: checkUser._id
            }
            req.session.save();
            res.status(201).json({ _id: checkUser._id });
        }
        else {
            const acctoken = req.body.userFb.accessToken;
            FB.setAccessToken(acctoken);
            FB.api(
                '/me',
                'GET',
                { "fields": "gender,birthday" },
                async function (response) {
                    const newUser = await UserModel.create({
                        accessToken: req.body.userFb.accessToken,
                        name: req.body.userFb.name,
                        fbId: req.body.userFb.fbId,
                        email: req.body.userFb.email,
                        avatarUrl: [req.body.userFb.avatarUrl],
                        gender: response.gender == "male" ? "Nam" : "Nữ",
                        birthday: new Date(response.birthday),
                        age: Number(new Date().getFullYear() - new Date(response.birthday).getFullYear()),
                        rangeAge : Number(new Date().getFullYear() - new Date(response.birthday).getFullYear())
                    });
                    req.session.user = {
                        _id: newUser._id
                    };
                    req.session.save();
                    res.status(201).json({ _id: newUser._id });
                }
            );
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});
// Send sms
router.post("/loginSms", async (req, res) => {
    try {
        const validcontact = /(84)+(9\d|3[2-8]|8[1-5]|7[0|6|7|8|9])+([0-9]{7})$/;
        const contact = `84${req.body.contact}`;
        const user = await UserModel.findOne({ contact: { $eq: contact } }).exec();
        if (user) {
            //create session
            req.session.user = {
                _id: user._id
            };
            req.session.save();
            // send an OTP
            const OTP = Math.floor((Math.random() * 100000) + 1);
            await UserModel.updateOne({ _id: user._id }, { $set: { OTP: OTP } });
            const from = 'Tinder';
            const to = `${contact}`;
            const text = `Your code is ${OTP}`;
            nexmo.message.sendSms(from, to, text);
            res.status(201).json({ message: "OK" })
        }
        else {
            if (!contact.match(validcontact)) {
                res.status(201).json({ message: "Ko ton tai", isValid: false })
            }
            else {
                res.status(201).json({ message: "Ko ton tai", isValid: true })
            }
        }

    } catch (error) {
        console.log(error);
    }
})
// change contact 
router.post("/changeContact", async (req,res)=>{
    try {
        const userId = req.session.user._id;
        const contact = `84${req.body.contact}`;
        const validcontact = /(84)+(9\d|3[2-8]|8[1-5]|7[0|6|7|8|9])+([0-9]{7})$/;
        if (!contact.match(validcontact)) {
            res.status(201).json({ isValid: false })
        }
        else {
            await UserModel.updateOne({_id : userId}, {$set:{contact : contact}});
            res.status(201).json({ isValid: true })
        }
    } catch (error) {
        res.status(501).end(error.message)
    }
})
//check OTP test
router.get("/checkOTPtest", (req, res) => {
})
//check OTP 
router.post("/checkOTP", async (req, res) => {
    try {
        const OTP = req.body.OTP;
        const user = await UserModel.findById(req.session.user._id).exec();
        if (user.OTP === OTP) {
            res.status(200).send({ success: true })
        }
        else {
            res.status(200).send({ success: false })
        }
    } catch (error) {

    }
})
// Log out
router.get("/logout", (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ message: "Logout" });
    } catch (error) {
        res.status(500).end(error.message);
    }
})
// Sent An Email to Verify Account
router.post("/verify-account", async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email }).exec();
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "dipperpine99@gmail.com",
            pass: "cancaiten030"
        }
    });
    const mainOption = {
        from: "Main Sever",
        to: `${user.email}`,
        subject: "Xác nhận tài khoản",
        text: `You recieved message form Main Sever`,
        html: `<h1> Link xác nhận tài khoản </h1><a href="http://localhost:3000/verify/${
            user._id
            }">http://localhost:3000/app/verify/${user._id}</a> `
    };
    transporter.sendMail(mainOption, (err, info) => {
        if (err) {
            console.log(err);
        }
        console.log(`Message send `);
    });
    res.json(user.email);
});
// Verify Account
router.post("/verify/:id", async (req, res, next) => {
    const userId = req.params.id;
    await UserModel.updateOne({_id : userId}, { $set: { verify: true } });
    res.status(201).json({ok: "OK"})
    //res.status(201).redirect('/app/recs');
});
// Get info from Facebook
router.get("/getAgeandGender", (req, res) => {
    const acctoken = req.body.acctoken;
    FB.setAccessToken(acctoken);
    FB.api(
        '/me',
        'GET',
        { "fields": "gender,birthday" },
        function (response) {
            res.status(200).json(response);
        }
    );
})
//edit Profile
router.post("/editProfile", async (req, res) => {
    await UserModel.updateOne({ _id: req.body._id }, { $set: { introduce: req.body.introduce, school: req.body.school, gender: req.body.gender } });
    res.status(201).json({ message: "OK" });
})
// change Status
router.post("/changeStatus", async (req,res)=>{
    const userId= req.session.user._id;
    const status = !Boolean(req.body.status);
    await UserModel.updateOne({_id : userId}, {$set:{isHide : status}});
    res.status(201).json({message : "OK"});
})
// upload image
router.post("/uploadImage", async (req, res) => {
    try {
        const url = req.body.url;
        const userId = req.session.user._id;
        await UserModel.updateOne({ _id: userId }, { $push: { avatarUrl: url } })
        res.status(201).json({ message: "OK" });
    } catch (error) {
        res.status(501).end(error);
    }
})
// choose Avatar 
router.post("/chooseAvatar", async (req,res)=>{
    try {
        const userId= req.session.user._id;
        const url = req.body.url;
        await UserModel.updateOne({ _id: userId }, { $pull: { avatarUrl: url } });
        await UserModel.updateOne({_id : userId} , {$push : { avatarUrl : {$each : [url],  $position : 0}}})
        res.status(201).json({message : "OK"});
    } catch (error) {
        res.status(501).end(error);
    }
})
// delete image 
router.post("/deleteImage", async (req, res) => {
    try {
        const url = req.body.url;
        const userId = req.session.user._id;
        await UserModel.updateOne({ _id: userId }, { $pull: { avatarUrl: url } })
        res.status(201).json({ message: "OK" });
    } catch (error) {
        res.status(501).end(error);
    }
})
// get Info
router.post("/getInfo" ,async (req,res)=>{
    try {
       const userId = req.body.id
       const user = await UserModel.findById(userId , "name avatarUrl");
        res.status(201).json(user);
    } catch (error) {
        res.status(500).end(error.message);
    }
})
// get Info People
router.get("/getInfoPeople", async (req, res) => {
    try {
        const userId = req.session.user._id;
        const THArray = new Array();
        const userArray = new Array();
        const Like = await UserModel.findById(userId, 'Like');
        const Liked = await UserModel.findById(userId, 'Liked');
        const LikeArray = Array.from(Like.Like).map(item => item.id);
        const LikedArray = Array.from(Liked.Liked).map(item => item.id);
        for (let i = 0; i < LikeArray.length; ++i)
            for (let j = 0; j < LikedArray.length; ++j) {
                if (LikeArray[i] === LikedArray[j]) {
                    THArray.push(LikeArray[i]);
                }
            }
        for (let i = 0; i < THArray.length; ++i) {
            const user = await UserModel.findById(THArray[i], "name  birthday introduce school avatarUrl gender contact age");
            userArray.push(user)
        }
        res.status(200).json(JSON.stringify(userArray));
    } catch (error) {
        res.status(500).end(error.message);
    }
})
//update Thong tin tim kiem
router.post("/updateSetting", async(req,res)=>{
    try {
        const userId = req.session.user._id;
        const {rangeAge , lookingGender} = req.body;
        await UserModel.updateOne({_id : userId}, {$set : {rangeAge : Number(rangeAge), lookingGender : lookingGender}});
        res.status(201).json({message : "Ok"})
    } catch (error) {
        res.status(500).end(error.message);
    }
})
//looking people
router.get("/lookingPeople", async (req, res) => {
    try {
        const userId = req.session.user._id;
        const User = await UserModel.findById(userId);
        const lookupAge = User.rangeAge;
        const lookupGender = User.lookingGender;
        const LikeArray = Array.from((await UserModel.findById(userId, "Like")).Like).map(item => item.id);
        let FindPeople = null ;
        if(lookupGender == "Tất cả") {
             FindPeople = await UserModel.find({
                $and: [
                    { isHide : false},
                    { _id: { $not: { $eq: userId } } },
                    { $and: [{ age: { $gte: 18 }, age: { $lte: Number(lookupAge) } }] },
                    {_id : {$nin : LikeArray}}
                ]
            } , "name birthday introduce school avatarUrl gender contact age");
        }
        else {FindPeople = await UserModel.find({
            $and: [
                { isHide : false},
                { _id: { $not: { $eq: userId } } },
                { $and: [{ age: { $gte: 18 }, age: { $lte: Number(lookupAge) } }] },
                { gender: lookupGender },
                {_id : {$nin : LikeArray}}
            ]
        } , "name birthday introduce school avatarUrl gender contact age");
    }
        res.status(200).json(JSON.stringify(FindPeople))
    } catch (error) {
        res.status(500).end(error.message);
    }
})
//addLikePeople
router.post("/addLikePeople", async (req, res) => {
    try {
        const peopleId = req.body._id;
        const userId = req.session.user._id;
        await UserModel.updateOne({ _id: userId }, { $push: { Like: { id: peopleId, date: new Date().toUTCString() } } });
        await UserModel.updateOne({ _id: peopleId }, { $push: { Liked: { id: userId, date: new Date().toUTCString() } } });
        const hasLiked = await UserModel.findOne({ $and: [{ _id: userId }, { Liked: { $elemMatch: { id: peopleId } } }] });
        if (hasLiked) {
            res.status(201).json({ isKet: true })
        }
        res.status(201).json({ isKet: false })

    } catch (error) {
        res.status(501).end(error.message);
    }
})
module.exports = router;