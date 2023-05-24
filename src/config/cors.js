import dotenv from "dotenv";
dotenv.config();

export function CorsFunction() {
  var allowlist = process.env.ALLOW_DOMAINS.split(",");

  var corsOptionsDelegate = function (req, callback) {
    var corsOptions;

    if (allowlist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    // console.log(req.header("Origin"))
    callback(null, corsOptions);
  };
  return {
    corsOptionsDelegate,
    allowlist,
  };
}
