const userAuth = async (req, res, next) => {
  const user = req.cookies.username;
  console.log(user);
  if (user === undefined) {
    res.status(401);
    res.send("User must login first");
  } else {
    res.status(200);
    next();
  }
};

module.exports = userAuth;
