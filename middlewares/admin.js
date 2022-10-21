module.exports = (req,res,next)=>{
    if(req.user.role !== 'admin') return res.status(403).send({msg:'you aren\'t admin'});
    next()
}