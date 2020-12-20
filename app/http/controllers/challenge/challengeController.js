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

    async showPost(req,res){
        
        try{
            let apost = await Post.findOne({
                _id : req.params.id
            });
            let ch = await Challenge.findOne({
                _id : apost.post_challenge
            });

            let title = 'نمایش پست';
            title +=" از چالش: "
            title += ch.challenge_title
    
    
            res.render('home/post/show', {
                title,
                challenge:ch,
                post:apost
            });
        }catch(err){
            console.log(err);
        }
    }

    async addPost(req ,res){
        try{
            let challenge = await Challenge.findOne({
                _id : req.params.id
            });
            let postData = {
                post_user: req.user.id,
                post_challenge: challenge.id,
                body: req.body.body,
                unique:req.body.unique
            }



            if (req.files) {
                // make other sizes for cover
                let file_data = await this.ClassifyPostFiles(req.files);
                postData.files = file_data;
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
    async ClassifyPostFiles(files){
        const paths = files.map(file=>file.path).map(l => this.getUrlImage(l,6));
        const mimes = files.map(file=>file.mimetype);
        let types = []

        mimes.forEach(mime =>{
            let index = mime.indexOf("/");
            types.push(mime.substring(0,index))
        })
        
        let answer = {};
        answer.image =[]
        answer.audio =[]
        answer.video =[]
        for(let i=0;i<paths.length;i++){
            answer[types[i]].push(paths[i])
        }
        return answer;
    }
    
    async showChallenge(req , res){
        let challenge = await Challenge.findOne({
            _id : req.params.id
        });

        let page = req.query.page || 1;
        let posts = await Post.paginate({post_challenge : challenge.id}, {
            page,
            sort: {
                createdAt: 1
            },
            limit: 6
        });

        let users = [];
        for (let i of posts.docs) {
            let id = i.post_user;
            let user = await User.findOne({
                _id : id
            });
            users.push(user)

        }
        let followed =  challenge.followers.includes(req.user.id);
        res.render('home/cl/show',{challenge,followed,posts,usernames : users.map(user=>user.email)})
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
                challenges,
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
            addresImages[w + 'X' + h] = this.getUrlImage(`${image.destination}/${imageName}`,8);

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

    getUrlImage(dir,i) {
        return dir.substring(i);
    }


}

module.exports = new challengeController();