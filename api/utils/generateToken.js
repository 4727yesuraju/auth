import jwt from 'jsonwebtoken';

//after you login
export const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.KEY,{
        expiresIn : "15d"
    })

    res.cookie('jwt',token,{
        maxAge : 15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== 'development'
    })
}