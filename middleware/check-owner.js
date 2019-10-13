module.exports = (req, res, next) => {
    // Is it the admin
    if (req.userData.email != process.env.ADMIN_EMAIL) { 
        //no? then is it his property
        if (res.property.agentEmail != req.userData.email) { 
            //no ? then go away
            return res.status(401).json({ message: "Not Your Property" });
        };
    };
    // if it is the admin or it is his property then go ahead
    next();
};