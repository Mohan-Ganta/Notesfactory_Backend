const nodemailer = require("nodemailer")
const mailSender = nodemailer.createTransport({
    service : "gmail",
    port : 587,
    secure : true,
    pool : true,
    auth : {
        user : "tempabc70759@gmail.com",
        pass : "gpnjhkpgdlkosfmc"
    }
})