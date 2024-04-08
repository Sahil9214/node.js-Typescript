/*
!Learning from this 
* how to use typescript
1.npm init -y 
2.npm install express typescript @types/node @types/express
3. npx tsc --init main command hai ye
4. tsconfig file build in them find outDir and rootDir 
  "rootDir": "src", 
  "outDir": "build", 

5 make src file and inside that use make index.js

6. in Package.json file  
"start": "npx tsc && node build/index.js" write this command

7 .in index.js file 👇👇👇👇 see below file






*/

import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", async (req: Request, res: Response) => {
  try {
    res.send({ msg: "ram ram sare bhai ne" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  try {
    console.log("Connect is running");
  } catch (err) {
    console.log(err);
  }
});
