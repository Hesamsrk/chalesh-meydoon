const controller = require('app/http/controllers/controller');
const Challenge = require('app/models/challenge');
const Post = require('app/models/post');
const sharp = require('sharp');
const path = require("path");
const rimraf = require('rimraf');
const User = require('app/models/user');
class challengeController extends controller {

    async showCreateForm(req, res) {
        const title = 'ایجاد چالش جدید';
    
        res.render('home/cl/create', {
            title
        });
    }


    async showChallenge(req , res){
        let challenge = await Challenge.findOne({
            _id : req.params.id
        });
        let followed =  challenge.followers.includes(req.user.id);
        res.render('home/cl/show',{challenge,followed})
    }

    async follow(req,res){
        let challenge = await Challenge.findOne({
            _id : req.params.id
        });

        if(challenge.followers.includes(req.user.id)){
            challenge.followers.remove(req.user.id);
            await challenge.save();
            this.back(req,res);
        }
        else{
            challenge.followers.push(req.user.id);
            await challenge.save();
            this.back(req,res);
        }
    }


    async showPostForm(req,res){
        const title = 'ایجاد پست جدید';
        let challenge = await Challenge.findOne({
            _id : req.params.id
        });
        res.render('home/post/create', {
            title,
            challenge
        });
    }

    async addPost(req ,res){
        try{
            let challenge = await Challenge.findOne({
                _id : req.params.id
            });
            let postData = {
                post_user: challenge.challenge_user,
                post_challenge: challenge.id,
                body: req.body.body,
                files:req.body.files,
                unique:req.body.unique
            }

            let newPost = new Post(postData);


            challenge.posts.push(newPost.id);
            challenge.postCount+=1;
            await newPost.save();
            await challenge.save();
            res.redirect(`/cl/show/${req.params.id}`);
        }catch(e){
            console.log(e);
        }
    }

    async showChallengeList(req, res) {
        let page = req.query.page || 1;
        let challenges = await Challenge.paginate({}, {
            page,
            sort: {
                createdAt: 1
            },
            limit: 6
        });
        let users = [];
        try {
            for (let i of challenges.docs) {
                let id = i.challenge_user;
                let user = await User.findOne({
                    _id : id
                });
                users.push(user)

            }
            res.render('home/cl/index', {
                title: 'چالش ها',
                challenges: challenges,
                usernames : users.map(user=>user.email)
            })
        } catch (error) {
            console.log(error);
        }
    }

    async saveChallengeProcess(req, res) {
        let status = await this.validationData(req);
        if (!status) {
            if (req.file) {
                let p = './public/uploads/images/challenge/' + req.body.challenge_title
                rimraf(p, (err) => {
                    if (err)
                        console.log(String(err).red);
                })
            }
            return this.back(req, res);
        }



        let {
            challenge_title,
            official,
            cover,
            body,
            tags
        } = req.body;

        let challenge_data = {
            challenge_user: req.user._id,
            challenge_title,
            official,
            body,
            cover,
            tags
        };


        if (req.file) {
            // make other sizes for cover
            let image_name = this.imageResize(req.file);
            challenge_data.cover = image_name;
        }


        let newChallenge = new Challenge(challenge_data);

        await newChallenge.save();

        return res.redirect('/cl/');
    }

    imageResize(image) {
        const imageInfo = path.parse(image.path);
        let addresImages = {};
        addresImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);

        const resize = size => {
            let w = size.w;
            let h = size.h;
            let imageName = `${imageInfo.name}-${w+'X'+h}${imageInfo.ext}`;
            addresImages[w + 'X' + h] = this.getUrlImage(`${image.destination}/${imageName}`);

            sharp(image.path)
                .resize(w, h)
                .toFile(`${image.destination}/${imageName}`);
        }

        [{
            w: 360,
            h: 360
        }].map(resize);

        return addresImages;
    }

    getUrlImage(dir) {
        return dir.substring(8);
    }


}

module.exports = new challengeController();