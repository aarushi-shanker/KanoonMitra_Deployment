import JWT from "jsonwebtoken";

export const authMid = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    await logEvent("ERROR", "AUTH", {
      message: `Auth failed. Error : ${error.message}`,
    });
    res.status(401).send({
        message: 'Auth failed',
        success: false
    })
  }
};
