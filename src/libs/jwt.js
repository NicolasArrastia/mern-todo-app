import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((res, rej) => {
    jwt.sign(
      { ...payload },
      TOKEN_SECRET,
      {
        expiresIn: "2 days",
      },
      (err, token) => {
        if (err) {
          console.log({ err });
          rej(err);
        }
        res(token);
      }
    );
  });
}

// import { TOKEN_SECRET } from "../config.js";
// import jwt from "jsonwebtoken";

// export function createAccessToken(payload) {
//   return new Promise((res, rej) => {
//     jwt.sign({ ...payload }, TOKEN_SECRET, { expiresIn: 60 }, (err, token) => {
//       if (err) {
//         console.log({ err });
//         rej(err);
//       }
//       res(token);
//     });
//   });
// }
