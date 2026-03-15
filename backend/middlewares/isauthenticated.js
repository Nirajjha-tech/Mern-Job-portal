import jwt from 'jsonwebtoken'
const isauthenticated=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Login Please",
                success:false
            })
        }
        const decode= jwt.verify(token,process.env.SecretKey)
        if(!decode){
            return res.status(401).json({
                message:"Invalid Token",
                success:false
            })
        }
        req.id=decode.userId
        next()
    }
    catch(error){
        return res.status(500).json({
                message:"Internal server error",
                success:false
            })
     
    }
}
export default isauthenticated