import express from "express";
import myParser from "body-parser";
import bcrypt from "bcrypt";
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';



const port = process.env.PORT;
const saltrounds = parseInt(process.env.SALTROUNDS);

const app = express();
app.use(cors());
await mongoose.connect(process.env.DATABASEURL)
    .then(() => console.log('Database Sucessfully Connected!'));


const fileschema = ({
    name: String,
    filedescription: String,
    path: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    
    size: Number,
    isMerged: {
        type: Boolean,
        default: false
    },
    previouslymain: {
        type: Boolean,
        default: false
    },
    initialmain: {
        type: Boolean,
        default: false
    }
});

const collaborationrequestschema = ({
    song: String,
    owner: String,
    description: String,
    roleneeded: [String],
    requests: [
        {
            userid: String,
            message: String,
            pending: {
                type: Boolean,
                default: true
            },
            accepted: {
                type: Boolean,
                default: false
            },
            rejected: {
                type: Boolean,
                default: false
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});

const songschema = ({
    name: String,
    mainaudiofile: [fileschema],
    branchaudiofiles: [fileschema],
    image: String,
    description: String,
    lyrics: String,
    genres: [String],
    languages: [String],
    colaborationrequests: [String],
    colaborations: [{
        userid: String,
        roles: [String]
    }],
    date: {
        type: Date,
        default: Date.now()
    },
    owner: String,
    ownerroles: [String],
    instruments: [String],
    likes: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    chats: [{
        sender: String,
        message: String,
        date: {
            type: Date,
            default: Date.now()
        }
    }]
});


const userschema = ({
    name: String,
    email: String,
    password: String,
    bio: String,
    image: String,
    roles: [String],
    genres: [String],
    languages: [String],
    followers: [String],
    following: [String],
    songs: [songschema],
    colaborations: [{
        songid: String,
        roles: [String]
    }],
    audiofiles: [fileschema],
    dateOfBirth: Date,
    location: String,
    facebookUrl: String,
    instagramUrl: String,
    sportifyUrl: String,
    xUrl: String,
    isComplete: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userschema);
const Song = mongoose.model('Song', songschema);
const File = mongoose.model('File', fileschema);
const Collaborationrequest = mongoose.model('Collaborationrequest', collaborationrequestschema);

app.use(myParser.json());
app.use(myParser.urlencoded({
    extended: true
}));
app.use(myParser.json({ limit: '200mb' }));
app.use(myParser.urlencoded({ limit: '200mb', extended: true }));


app.post("/loginRequest", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const result1 = await User.findOne({ email: email });
    if (!result1) {
        res.json({ message: false, error: "Wrong Email Try Registering !" });
    } else {
        const realpassword = result1.password;
        bcrypt.compare(password, realpassword, (err, result) => {
            if (err) {
                res.send("Password Validation Failed !");
            } else {
                if (result) {
                    res.status(200).json({ message: true ,email:email});
                } else {
                    res.json({ message: false, error: "Wrong Password !" });
                }
            }
        });
    }
});

app.post("/registerRequest", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const result = await User.findOne({ email: email });
    if (result) {
        res.json({ message: false, error: "User Exists" });
    } else {
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            if (err) {
                res.status(500).json({ message: false, error: "Hashing Error !" });
            } else {
                const newpassword = hash;
                const newUser = new User();
                newUser.name = name;
                newUser.email = email;
                newUser.password = newpassword;
                try {
                    await newUser.save();
                } catch (err) {
                    console.log(err);
                    res.status(500).json({ message: false, error: "server error" });
                }
                res.status(200).json({ message: true, name: `${name}`, email: `${email}` });
            }
        });
    }
});

app.post("/UpdateProfile", async (req, res) => {
    const email = req.query.email;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    } else {
        const id = result._id;
        try {
            await User.updateOne({ _id: id }, { $set: { name: req.body.name, bio: req.body.bio, image: req.body.image, roles: req.body.roles, genres: req.body.genres, languages: req.body.languages, dob: Date.parse(req.body.dateOfBirth), location: req.body.location, facebookUrl: req.body.facebook, instagramUrl: req.body.instagram, sportifyUrl: req.body.sportify, xUrl: req.body.x, isComplete: true } });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: false, error: "server error" });
        }
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.json({ message: false, error: "User Not Found" });
        } else {
            res.status(200).json({ message: true, data: user });
        }
    }
});


app.post("/ChangeEmail", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const new_email = req.body.new_email;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    } else {
        const realpassword = result.password;
        bcrypt.compare(password, realpassword, async (err, result) => {
            if (err) {
                res.json({ message: false, error: "Password Validation Failed !" });
            }
            else {
                if (result) {
                    const newresult = await User.findOne({ email: new_email });
                    if (newresult) {
                        res.json({ message: false, error: "Email Already Exists !" });
                    }
                    else {
                        try {
                            await User.updateOne({ email: email }, { $set: { email: new_email } });
                            const user = await User.findOne({ email: new_email });
                            res.status(200).json({ message: true, data: user });
                        } catch (err) {
                            res.status(500).json({ message: false, error: "server error" });
                        }
                    }
                } else {
                    res.json({ message: false, error: "Wrong Password !" });
                }
            }
        });
    }
});


app.post("/ChangePassword", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const new_password = req.body.new_password;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        const realpassword = result.password;
        bcrypt.compare(password, realpassword, async (err, result) => {
            if (err) {
                res.json({ message: false, error: "Password Validation Failed !" });
            }
            else {
                if (result) {
                    const newpassword = await bcrypt.hash(new_password, saltrounds);
                    try {
                        await User.updateOne({ email: email }, { $set: { password: newpassword } });
                        const user = await User.findOne({ email: email });
                        res.status(200).json({ message: true, data: user });
                    }
                    catch (err) {
                        res.status(500).json({ message: false, error: "server error" });
                    }
                }
                else {
                    res.json({ message: false, error: "Wrong Password !" });
                }
            }
        });
    }
});

app.get("/finduserwithemail", async (req, res) => {
    const email = req.query.email;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        res.status(200).json({ message: true, data: result });
    }
});

app.get("/finduserwithid", async (req, res) => {
    const id = req.query.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ message: false, error: "Invalid user" });
        }
        const result = await User.findOne({ _id: id });
        if (!result) {
            res.json({ message: false, error: "User Not Found" });
        }
        else {
            res.status(200).json({ message: true, data: result });
        }
    }
    catch (err) {
        res.status(500).json({ message: false, error: "server error" });
    }
});

app.post("/DeleteProfile", async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        const realpassword = result.password;
        bcrypt.compare(password, realpassword, async (err, result) => {
            if (err) {
                res.json({ message: false, error: "Password Validation Failed !" });
            }
            else {
                if (result) {
                    try {
                        const theirsongs = result.songs;
                        const theirsongids = [];
                        theirsongs.forEach(song => {
                            theirsongids.push(song._id);
                        })
                        const removesongcolaborators = async (song) => {
                            const colaborations = song.colaborations;
                            const colaboratorsid = [];
                            colaborations.forEach(async (colaboration) => {
                                colaboratorsid.push(colaboration.userid);
                            })
                            const deletecolaborators = async (uid) => {
                                const foundUser = await User.findOne({ _id: uid });
                                await User.updateOne({ _id: foundUser._id }, { $pull: { colaborations: { songid: song._id } } });
                            }
                            try {
                                await Promise.all(theirsongs.map(deletecolaborators));
                                const deletesongs = async (songid) => {
                                    const foundSong = await Song.findOne({ _id: songid });
                                    await Song.deleteOne({ _id: foundSong._id });
                                }
                                try {
                                    await Promise.all(theirsongids.map(deletesongs));
                                }
                                catch (err) {
                                    res.status(500).json({ message: false, error: "server error" });
                                }
                            } catch (err) {
                                res.status(500).json({ message: false, error: "server error" });
                            }
                        }
                        try {
                            await Promise.all(colaboratorsid.map(removesongcolaborators));
                        } catch (err) {
                            res.status(500).json({ message: false, error: "server error" });
                        }
                        const theircolaborations = result.colaborations;
                        const theircolaborationsongids = [];
                        theircolaborations.forEach(colaboration => {
                            theircolaborationsongids.push(colaboration.songid);
                        })
                        const removethemfromsong = async (songid) => {
                            const foundSong = await Song.findOne({ _id: songid });
                            await Song.updateOne({ _id: foundSong._id }, { $pull: { colaborations: { userid: result._id } } });
                        }
                        try {
                            await Promise.all(theircolaborationsongids.map(removethemfromsong));
                        }
                        catch (err) {
                            res.status(500).json({ message: false, error: "server error" });
                        }
                        await User.deleteOne({ _id: result._id });
                        res.status(200).json({ message: true });
                    }
                    catch (err) {
                        res.status(500).json({ message: false, error: "server error" });
                    }
                }
            }
        })
    }
});

app.post("/CreateSong", async (req, res) => {
    const email = req.query.email;
    var userid;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        userid = result._id;
        const name = req.body.name;
        const mainaudiofile = req.body.mainaudiofile;
        const image = req.body.image;
        const ownerroles = req.body.ownerroles;
        const description = req.body.description;
        const filedescription = req.body.filedescription;
        const lyrics = req.body.lyrics;
        const genres = req.body.genres;
        const languages = req.body.languages;
        const newFile = new File({
            name: name,
            filedescription: filedescription,
            path: mainaudiofile,
            owner: userid,
            size: 0,
            isMerged: true,
            initialmain: true
        });
        try {
            await newFile.save();
        }
        catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
        const newSong = new Song({
            name: name,
            image: image,
            description: description,
            lyrics: lyrics,
            genres: genres,
            languages: languages,
            owner: userid,
            ownerroles: ownerroles
        });
        try {
            await newSong.save();
            await Song.updateOne({ _id: newSong._id }, { $push: { mainaudiofile: newFile } });
            const updatedsong = await Song.findOne({ _id: newSong._id });
            await User.updateOne({ _id: userid }, { $push: { songs: updatedsong, audiofiles: newFile } });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: false, error: "server error" });
        }
        try {
            const output = await User.findOne({ _id: userid });
            res.status(200).json({ message: true, data: output });
        } catch {
            res.status(500).json({ message: false, error: "server error" });
        }
    }
});

app.post("/OwnerUpdateSong", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const image = req.body.image;
    const description = req.body.description;
    const lyrics = req.body.lyrics;
    const ownerroles = req.body.ownerroles;
    const genres = req.body.genres;
    const languages = req.body.languages;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid songid" });
            }
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                await Song.updateOne({ _id: songid }, { $set: { image: image, description: description, lyrics: lyrics, genres: genres, languages: languages, ownerroles: ownerroles } });
                const updatedsong = await Song.findOne({ _id: songid });
                const ownerid = updatedsong.owner;
                await User.updateOne({ _id: ownerid }, { $pull: { songs: { _id: songid } } });
                await User.updateOne({ _id: ownerid }, { $push: { songs: updatedsong } });
                const output = await User.findOne({ _id: ownerid });
                res.status(200).json({ message: true, data: output });
            } else {
                res.json({ message: false, error: "Song not found" });
            }
        } catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
    }

});




app.get("/song", async (req, res) => {
    const id = req.query.songid;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ message: false, error: "Invalid songid" });
        }
        const result = await Song.findOne({ _id: id });
        if (result) {
            res.status(200).json({ message: true, data: result });
        } else {
            res.json({ message: false, error: "Song not found" });
        }
    } catch (err) {
        res.status(500).json({ message: false, error: "server error" });
    }
});

app.post("/OwnerDeleteSong", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid songid" });
            }
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                const userid = songresult.owner;
                var mainfileid = "0";
                var branchfileids = [];
                var colaborators = [];
                if (songresult.mainaudiofile.length > 0) {
                    mainfileid = songresult.mainaudiofile[0]._id;
                    songresult.branchaudiofiles.forEach(file => {
                        branchfileids.push(file._id);
                    });
                } else {
                    songresult.branchaudiofiles.forEach(file => {
                        branchfileids.push(file._id);
                    });
                }
                if (mainfileid !== "0") {
                    branchfileids.push(mainfileid);
                }
                songresult.colaborations.forEach(colab => {
                    colaborators.push(colab.userid);
                });
                const deletesongfromcolab = async (uid) => {
                    const foundUser = await User.findOne({ _id: uid });
                    await User.updateOne({ _id: foundUser._id }, { $pull: { colaborations: { songid: songid } } });
                }
                try {
                    await Promise.all(colaborators.map(deletesongfromcolab));
                }
                catch (err) {
                    res.status(500).json({ message: false, error: "server error" });
                }
                await Song.deleteOne({ _id: songid });
                await User.updateOne({ _id: userid }, { $pull: { songs: { _id: songid } } });
                const deleteFileAndUser = async (fileId) => {
                    const foundFile = await File.findOne({ _id: fileId });
                    const foundUser = await User.findOne({ _id: foundFile.owner });
                    await User.updateOne({ _id: foundUser._id }, { $pull: { audiofiles: { _id: foundFile._id } } });
                    await File.deleteOne({ _id: foundFile._id });
                };
                try {
                    await Promise.all(branchfileids.map(deleteFileAndUser));
                    const output = await User.findOne({ _id: userid });
                    res.status(200).json({ message: true, data: output });
                } catch (err) {
                    res.status(500).json({ message: false, error: "server error" });
                }
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
    }

});

app.post("/OwnerAddFile", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const path = req.body.path;
    const filedescription = req.body.filedescription;

    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid songid" });
            }
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                const userid = result._id;
                const newFile = new File({
                    name: songresult.name,
                    filedescription: filedescription,
                    path: path,
                    owner: userid,
                    size: 0,
                    isMerged: false
                });
                await newFile.save();
                const fileid = newFile._id;
                if (songresult.mainaudiofile.length > 0) {
                    await File.updateOne({ _id: fileid }, { $set: { isMerged: false } });
                    const updatedfile = await File.findOne({ _id: fileid });
                    await Song.updateOne({ _id: songid }, { $push: { branchaudiofiles: updatedfile } });
                } else {
                    await File.updateOne({ _id: fileid }, { $set: { isMerged: true, initialmain: true } });
                    const updatedfile = await File.findOne({ _id: fileid });
                    await Song.updateOne({ _id: songid }, { $push: { mainaudiofile: updatedfile } });
                }
                const updatedfilenew = await File.findOne({ _id: fileid });
                await User.updateOne({ _id: userid }, { $push: { audiofiles: updatedfilenew } });
                const newsong = await Song.findOne({ _id: songid });
                await User.updateOne({ _id: userid }, { $pull: { songs: { _id: songid } } });
                await User.updateOne({ _id: userid }, { $push: { songs: newsong } });
                const output = await User.findOne({ _id: userid });
                res.status(200).json({ message: true, data: output });
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
    }

});

app.post("/collaboratoraddfile", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const path = req.body.path;
    const filedescription = req.body.filedescription;

    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid songid" });
            }
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                const userid = result._id;
                const newFile = new File({
                    name: songresult.name,
                    filedescription: filedescription,
                    path: path,
                    owner: userid,
                    size: 0,
                    isMerged: false
                });
                await newFile.save();
                const fileid = newFile._id;
                if (songresult.mainaudiofile.length > 0) {
                    await File.updateOne({ _id: fileid }, { $set: { isMerged: false } });
                    const updatedfile = await File.findOne({ _id: fileid });
                    await Song.updateOne({ _id: songid }, { $push: { branchaudiofiles: updatedfile } });
                } else {
                    await File.updateOne({ _id: fileid }, { $set: { isMerged: true, initialmain: true } });
                    const updatedfile = await File.findOne({ _id: fileid });
                    await Song.updateOne({ _id: songid }, { $push: { mainaudiofile: updatedfile } });
                }
                const updatedfilenew = await File.findOne({ _id: fileid });
                await User.updateOne({ _id: userid }, { $push: { audiofiles: updatedfilenew } });
                const newsong = await Song.findOne({ _id: songid });
                await User.updateOne({ _id: newsong.owner }, { $pull: { songs: { _id: songid } } });
                await User.updateOne({ _id: newsong.owner }, { $push: { songs: newsong } });
                const output = await User.findOne({ _id: userid });
                res.status(200).json({ message: true, data: output });
            }
        }
        catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
    }
});



app.post("/OwnerDeleteFile", async (req, res) => {
    const email = req.query.email;
    const fileid = req.query.fileid;
    const songid = req.query.songid;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid songid" });
            }
            const userid = result._id;
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {

                const file = await File.findOne({ _id: fileid });
                await User.updateOne({ _id: file.owner }, { $pull: { audiofiles: { _id: fileid } } });
                if (file.isMerged) {
                    await Song.updateOne({ _id: songid }, { $pull: { mainaudiofile: { _id: fileid } } });
                }
                else {
                    await Song.updateOne({ _id: songid }, { $pull: { branchaudiofiles: { _id: fileid } } });
                }
                const newsong = await Song.findOne({ _id: songid });
                await User.updateOne({ _id: userid }, { $pull: { songs: { _id: songid } } });
                await User.updateOne({ _id: userid }, { $push: { songs: newsong } });
                await File.deleteOne({ _id: fileid });
                const output = await User.findOne({ _id: userid });
                res.status(200).json({ message: true, data: output });
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
    }
});

app.post("/ownermergefile", async (req, res) => {
    const email = req.query.email;
    const fileid = req.query.fileid;
    const songid = req.query.songid;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid songid" });
            }
            const userid = result._id;
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                try {
                    if (!mongoose.Types.ObjectId.isValid(fileid)) {
                        return res.json({ message: false, error: "Invalid fileid" });
                    }
                    const fileresult = await File.findOne({ _id: fileid });
                    if (fileresult) {
                        const previousfile = await File.findOne({ _id: songresult.mainaudiofile[0]._id });
                        await File.updateOne({ _id: previousfile._id }, { $set: { isMerged: false, previouslymain: true } });
                        await File.updateOne({ _id: fileresult._id }, { $set: { isMerged: true, previouslymain: false } });
                        const updatednewfile = await File.findOne({ _id: fileresult._id });
                        const updatednewfileowner = await User.findOne({ _id: updatednewfile.owner });
                        await User.updateOne({ _id: updatednewfileowner._id }, { $pull: { audiofiles: { _id: updatednewfile._id } } });
                        await User.updateOne({ _id: updatednewfileowner._id }, { $push: { audiofiles: updatednewfile } });
                        const updatedpreviousfile = await File.findOne({ _id: previousfile._id });
                        const updatedpreviousfileowner = await User.findOne({ _id: updatedpreviousfile.owner });
                        await User.updateOne({ _id: updatedpreviousfileowner._id }, { $pull: { audiofiles: { _id: updatedpreviousfile._id } } });
                        await User.updateOne({ _id: updatedpreviousfileowner._id }, { $push: { audiofiles: updatedpreviousfile } });
                        await Song.updateOne({ _id: songid }, { $pull: { mainaudiofile: { _id: previousfile._id } } });
                        await Song.updateOne({ _id: songid }, { $push: { mainaudiofile: updatednewfile } });
                        await Song.updateOne({ _id: songid }, { $pull: { branchaudiofiles: { _id: updatednewfile._id } } });
                        await Song.updateOne({ _id: songid }, { $push: { branchaudiofiles: updatedpreviousfile } });
                        const updatedsong = await Song.findOne({ _id: songid });
                        await User.updateOne({ _id: userid }, { $pull: { songs: { _id: updatedsong._id } } });
                        await User.updateOne({ _id: userid }, { $push: { songs: updatedsong } });
                        const output = await User.findOne({ _id: userid });
                        res.status(200).json({ message: true, data: output });
                    }
                    else {
                        res.json({ message: false, error: "File Not Found" });
                    }
                }
                catch (err) {
                    return res.json({ message: false, error: "Invalid fileid" });
                }
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
    }
});


app.post("/ownerrevertfile", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid songid" });
            }
            const userid = result._id;
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                const previousmain = songresult.branchaudiofiles.find(file => file.previouslymain === true);
                if (previousmain) {
                    await File.updateOne({ _id: previousmain._id }, { $set: { isMerged: true, previouslymain: false } });
                    await File.updateOne({ _id: songresult.mainaudiofile[0]._id }, { $set: { isMerged: false, previouslymain: true } });
                    const updatedoldfile = await File.findOne({ _id: songresult.mainaudiofile[0]._id });
                    const updatedoldfileowner = await User.findOne({ _id: updatedoldfile.owner });
                    await User.updateOne({ _id: updatedoldfileowner._id }, { $pull: { audiofiles: { _id: updatedoldfile._id } } });
                    await User.updateOne({ _id: updatedoldfileowner._id }, { $push: { audiofiles: updatedoldfile } });
                    const updatednewfile = await File.findOne({ _id: previousmain._id });
                    const updatednewfileowner = await User.findOne({ _id: updatednewfile.owner });
                    await User.updateOne({ _id: updatednewfileowner._id }, { $pull: { audiofiles: { _id: updatednewfile._id } } });
                    await User.updateOne({ _id: updatednewfileowner._id }, { $push: { audiofiles: updatednewfile } });
                    await Song.updateOne({ _id: songid }, { $pull: { mainaudiofile: { _id: updatedoldfile._id } } });
                    await Song.updateOne({ _id: songid }, { $push: { mainaudiofile: updatednewfile } });
                    await Song.updateOne({ _id: songid }, { $pull: { branchaudiofiles: { _id: updatednewfile._id } } });
                    await Song.updateOne({ _id: songid }, { $push: { branchaudiofiles: updatedoldfile } });
                    const updatedsong = await Song.findOne({ _id: songid });
                    await User.updateOne({ _id: userid }, { $pull: { songs: { _id: updatedsong._id } } });
                    await User.updateOne({ _id: userid }, { $push: { songs: updatedsong } });
                    const output = await User.findOne({ _id: userid });
                    res.status(200).json({ message: true, data: output });
                }
                else {
                    res.json({ message: false, error: "No previous main file" });
                }
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
    }
});


app.post("/Addcolaborationrequest", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const description = req.body.description;
    const roleneeded = req.body.roleneeded;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {

        const userid = result._id;
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid songid" });
            }
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                const newcolaborationrequest = new Collaborationrequest({
                    song: songid,
                    owner: userid,
                    description: description,
                    roleneeded: roleneeded
                });
                await newcolaborationrequest.save();
                await Song.updateOne({ _id: songid }, { $push: { colaborationrequests: newcolaborationrequest._id } });
                const thissong = await Song.findOne({ _id: songid });
                await User.updateOne({ _id: userid }, { $pull: { songs: { _id: songid } } });
                await User.updateOne({ _id: userid }, { $push: { songs: thissong } });
                const output = await User.findOne({ _id: userid });
                res.status(200).json({ message: true, data: output, newcolaborationrequest: newcolaborationrequest });
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
    }
});

app.get("/Getcolaborationrequestsbyid", async (req, res) => {
    const id = req.query.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ message: false, error: "Invalid id" });
        }
        const result = await Collaborationrequest.findOne({ _id: id });
        if (result) {
            res.status(200).json({ message: true, data: result });
        }
        else {
            res.json({ message: false, error: "Colaboration request not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: false, error: "server error" });
    }
});

app.post("/Deletecolaborationrequest", async (req, res) => {
    const id = req.query.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ message: false, error: "Invalid id" });
        }
        const result = await Collaborationrequest.findOne({ _id: id });
        const resultsong = await Song.findOne({ _id: result.song });
        if (result) {
            await Collaborationrequest.deleteOne({ _id: id });
            await Song.updateOne({ _id: result.song }, { $pull: { colaborationrequests: id } });
            await User.updateOne({ _id: result.owner }, { $pull: { songs: { _id: result.song } } });
            const resultsong = await Song.findOne({ _id: result.song });
            await User.updateOne({ _id: result.owner }, { $push: { songs: resultsong } });
            const output = await User.findOne({ _id: result.owner });
            res.status(200).json({ message: true, data: output });
        }
        else {
            res.json({ message: false, error: "Colaboration request not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: false, error: "server error" });
    }
});

app.post("/applycolaborationrequest", async (req, res) => {
    const email = req.query.email;
    const id = req.query.id;
    const message = req.query.message;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        const userid = result._id;
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.json({ message: false, error: "Invalid id" });
            }
            const result = await Collaborationrequest.findOne({ _id: id });
            if (result) {
                await Collaborationrequest.updateOne({ _id: id }, {
                    $push: {
                        requests: {
                            userid: userid,
                            message: message
                        }
                    }
                });
                const output = await Collaborationrequest.findOne({ _id: id });
                res.status(200).json({ message: true, collaborationrequest: output });
            }
            else {
                res.json({ message: false, error: "Colaboration request not found" });
            }
        }
        catch (err) {
            res.status(500).json({ message: false, error: "server error" });
        }
    }
});


app.post("/Acceptcolaborationapplication", async (req, res) => {
    const collaborationrequestid = req.query.collaborationrequestid;
    const applicationid = req.query.applicationid;
    try {
        if (!mongoose.Types.ObjectId.isValid(collaborationrequestid)) {
            return res.json({ message: false, error: "Invalid id" });
        }
        const colaborationresult = await Collaborationrequest.findOne({ _id: collaborationrequestid });
        if (colaborationresult) {
            try {
                if (!mongoose.Types.ObjectId.isValid(applicationid)) {
                    return res.json({ message: false, error: "Invalid id" });
                }
                const applicationuser = colaborationresult.requests.find((request) => request._id == applicationid);
                if (applicationuser) {
                    await User.updateOne({ _id: applicationuser.userid }, {
                        $push: {
                            colaborations: {
                                songid: colaborationresult.song,
                                roles: colaborationresult.roleneeded
                            }
                        }
                    });
                    await Song.updateOne({ _id: colaborationresult.song }, {
                        $push: {
                            colaborations: {
                                userid: applicationuser.userid,
                                roles: colaborationresult.roleneeded
                            }
                        }
                    });
                    await Collaborationrequest.deleteOne({ _id: collaborationrequestid });
                    await Song.updateOne({ _id: colaborationresult.song }, { $pull: { colaborationrequests: collaborationrequestid } });
                    await User.updateOne({ _id: colaborationresult.owner }, { $pull: { songs: { _id: colaborationresult.song } } });
                    const resultsong = await Song.findOne({ _id: colaborationresult.song });
                    await User.updateOne({ _id: resultsong.owner }, { $push: { songs: resultsong } });
                    const output = await User.findOne({ _id: colaborationresult.owner });
                    res.status(200).json({ message: true, data: output });
                }
                else {
                    return res.json({ message: false, error: "Invalid id" });
                }
            }
            catch {
                return res.json({ message: false, error: "Invalid id" });
            }
        }
        else {
            return res.json({ message: false, error: "Invalid id" });
        }
    }
    catch {
        return res.json({ message: false, error: "Invalid id" });
    }

});


app.post("/Rejectcolaborationapplication", async (req, res) => {
    const collaborationrequestid = req.query.collaborationrequestid;
    const applicationid = req.query.applicationid;
    try {
        if (!mongoose.Types.ObjectId.isValid(collaborationrequestid)) {
            return res.json({ message: false, error: "Invalid id" });
        }
        const colaborationresult = await Collaborationrequest.findOne({ _id: collaborationrequestid });
        if (colaborationresult) {
            try {
                if (!mongoose.Types.ObjectId.isValid(applicationid)) {
                    return res.json({ message: false, error: "Invalid id" });
                }
                const applicationuser = colaborationresult.requests.find((request) => request._id == applicationid);
                if (applicationuser) {
                    applicationuser.rejected = true;
                    applicationuser.pending = false;
                    await Collaborationrequest.updateOne({ _id: collaborationrequestid }, { $pull: { requests: { _id: applicationid } } });
                    await Collaborationrequest.updateOne({ _id: collaborationrequestid }, { $push: { requests: applicationuser } });
                    const output = await User.findOne({ _id: applicationuser.userid });
                    res.status(200).json({ message: true, data: output });
                }
                else {
                    return res.json({ message: false, error: "Invalid id" });
                }
            }
            catch {
                return res.json({ message: false, error: "Invalid id" });
            }
        }
        else {
            return res.json({ message: false, error: "Invalid id" });
        }
    }
    catch {
        return res.json({ message: false, error: "Invalid id" });
    }
});

app.post("/sendmessage", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const message = req.query.message;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid id" });
            }
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                await Song.updateOne({ _id: songid }, {
                    $push: {
                        chats: {
                            sender: result._id,
                            message: message
                        }
                    }
                });
                const updatedsong = await Song.findOne({ _id: songid });
                await User.updateOne({ _id: songresult.owner }, { $pull: { songs: { _id: songid } } });
                await User.updateOne({ _id: result._id }, { $push: { songs: updatedsong } });
                const output = await User.findOne({ _id: result._id });
                res.status(200).json({ message: true, data: output });
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch {
            return res.json({ message: false, error: "Invalid id" });
        }
    }
});

app.post("/deletecollaborator", async (req, res) => {
    const userid = req.query.userid;
    const songid = req.query.songid;
    try {
        if (!mongoose.Types.ObjectId.isValid(songid)) {
            return res.json({ message: false, error: "Invalid id" });
        }
        const songresult = await Song.findOne({ _id: songid });
        if (songresult) {
            try {
                if (!mongoose.Types.ObjectId.isValid(userid)) {
                    return res.json({ message: false, error: "Invalid id" });
                }
                const userresult = await User.findOne({ _id: userid });
                if (userresult) {
                    await User.updateOne({ _id: userid }, { $pull: { colaborations: { songid: songid } } });
                    await Song.updateOne({ _id: songid }, { $pull: { colaborations: { userid: userid } } });
                    await User.updateOne({ _id: songresult.owner }, { $pull: { songs: { _id: songid } } });
                    const updatedsong = await Song.findOne({ _id: songid });
                    await User.updateOne({ _id: songresult.owner }, { $push: { songs: updatedsong } });
                    const output = await User.findOne({ _id: userid });
                    res.status(200).json({ message: true, data: output });
                }
                else {
                    res.json({ message: false, error: "User Not Found" });
                }
            }
            catch {
                return res.json({ message: false, error: "Invalid id" });
            }
        }
        else {
            res.json({ message: false, error: "Song Not Found" });
        }
    }
    catch {
        return res.json({ message: false, error: "Invalid id" });
    }
});

app.post("/leavecollaboration", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const userresult = await User.findOne({ email: email });
    if (!userresult) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid id" });
            }
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                await User.updateOne({ _id: userresult._id }, { $pull: { colaborations: { songid: songid } } });
                await Song.updateOne({ _id: songid }, { $pull: { colaborations: { userid: userresult._id } } });
                await User.updateOne({ _id: songresult.owner }, { $pull: { songs: { _id: songid } } });
                const updatedsong = await Song.findOne({ _id: songid });
                await User.updateOne({ _id: songresult.owner }, { $push: { songs: updatedsong } });
                const output = await User.findOne({ _id: userresult._id });
                res.status(200).json({ message: true, data: output });
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch {
            return res.json({ message: false, error: "Invalid id" });
        }
    }
});


app.post("/OwnerPublishsong", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid id" });
            }
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                await Song.updateOne({ _id: songid }, {
                    published: true
                });
                const updatedsong = await Song.findOne({ _id: songid });
                await User.updateOne({ _id: result._id }, { $pull: { songs: { _id: updatedsong._id } } });
                await User.updateOne({ _id: result._id }, { $push: { songs: updatedsong } });
                const output = await User.findOne({ _id: result._id });
                res.status(200).json({ message: true, data: output });
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch {
            return res.json({ message: false, error: "Invalid id" });
        }
    }
});

app.post("/OwnerUnpublishsong", async (req, res) => {
    const email = req.query.email;
    const songid = req.query.songid;
    const result = await User.findOne({ email: email });
    if (!result) {
        res.json({ message: false, error: "User Not Found" });
    }
    else {
        try {
            if (!mongoose.Types.ObjectId.isValid(songid)) {
                return res.json({ message: false, error: "Invalid id" });
            }
            const songresult = await Song.findOne({ _id: songid });
            if (songresult) {
                await Song.updateOne({ _id: songid }, {
                    published: false
                });
                const updatedsong = await Song.findOne({ _id: songid });
                await User.updateOne({ _id: result._id }, { $pull: { songs: { _id: updatedsong._id } } });
                await User.updateOne({ _id: result._id }, { $push: { songs: updatedsong } });
                const output = await User.findOne({ _id: result._id });
                res.status(200).json({ message: true, data: output });
            }
            else {
                res.json({ message: false, error: "Song Not Found" });
            }
        }
        catch {
            return res.json({ message: false, error: "Invalid id" });
        }
    }
});

app.get("/userinsong", async(req,res)=>{
    const email = req.query.email;
    const songid = req.query.songid;
    const result = await User.findOne({email:email});
    if(!result){
        res.json({message:false,error:"User Not Found"});
    }
    else{
        try{
            if(!mongoose.Types.ObjectId.isValid(songid)){
                return res.json({message:false,error:"Invalid id 1"});
            }
            const songresult = await Song.findOne({ _id: songid });
            if(songresult){
                const responce = [];
                const thisuser = result;
                const thissong = songresult;
                if (thissong.owner==thisuser._id){
                    responce.push({isowner : true,user: thisuser,song: thissong});
                }else{
                    responce.push({isowner : false,user: thisuser,song: thissong});
                }
                const colaborators = [];
                const addcolab = async (colaboration)=>{
                    const colaborator = await User.findOne({ _id: colaboration.userid });
                    const role = colaboration.role;
                    colaborators.push({colaborator:colaborator,role:role});
                }
                try{
                    await Promise.all(thissong.colaborations.map(addcolab));
                }
                catch(err){
                    return res.json({message:false,error:"Invalid id 2"});
                }
                responce.push({colaborators:colaborators});
                const colabreq = [];
                const addcolabreq = async (colaboration)=>{
                    const colaborationrequest = await Collaborationrequest.findOne({ _id: colaboration });
                    colabreq.push(colaborationrequest);
                }
                try{
                    await Promise.all(thissong.colaborationrequests.map(addcolabreq));
                }
                catch(err){
                    return res.json({message:false,error:"Invalid id 3"});
                }
                responce.push({colaborationrequests:colabreq});
                const allusers = await User.find();
                responce.push({allusers:allusers});
                res.status(200).json({message:true,data:responce});
            }
            else{
                res.json({message:false,error:"Song Not Found"});
            }
        }
        catch(err){
            return res.json({message:false,error:"Invalid id 4"});
        }
    }
});



app.get("/user", async(req,res)=>{
    const email = req.query.email;
    const result = await User.findOne({email:email});
    if(!result){
        res.json({message:false,error:"User Not Found"});
    }
    else{
        
                const responce = [];
                const thisuser = result;

                responce.push({isowner : false,user: thisuser});

                responce.push({});
                responce.push({});
                responce.push({});
                const allusers = await User.find();
                responce.push({allusers:allusers});
                const allsongs = await Song.find();
                responce.push({allsongs:allsongs});
                const allcolaborationrequests = await Collaborationrequest.find();
                responce.push({allcolaborationrequests:allcolaborationrequests});
                res.status(200).json({message:true,data:responce});
    }
});


app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Server running at : [[http://localhost:${port}]]`);
});