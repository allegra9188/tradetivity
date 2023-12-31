const { ServerError } = require("../errors");
const prisma = require("../prisma");
const jwt = require("./auth/jwt");

const router = require("express").Router();
module.exports = router;

// Attaches user to res.locals if token is valid
router.use(async (req, res, next) => {
  // Check for token
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; // "Bearer <token>"
  if (!authHeader || !token) {
    return next();
  }

  // Get user from token
  try {
    const { id } = jwt.verify(token);
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err);
    next(new ServerError(401, "Invalid token."));
  }
});

router.use("/auth", require("./auth"));
router.use("/companies", require("./companies"));
router.use("/politicians", require("./politicians"));
router.use("/user", require("./users"));
router.use("/user-favorites", require("./favorites"));
router.use("/user-follows", require("./following"));
router.use("/quiverquant", require("./quiverServer"));
router.use("/senate", require("./senate"));
router.use("/house", require("./house"));
router.use("/articles", require("./articles"));
router.use("/lobbying", require("./propublica_lobbying"));
router.use("/member/house", require("./propublica_house")); // New endpoint
router.use("/member/senate", require("./propublica_senate")); // New endpoint
router.use("/summaries", require("./summaries"));