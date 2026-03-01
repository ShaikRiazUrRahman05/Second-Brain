//@ts-ignore

// import express from "express";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
// import { ContentModel, LinkModel, UserModel } from "./db.js";
// import { JWT_PASSWORD } from "./config.js";
// import { userMiddleware } from "./middleware.js";
// import { random } from "./utils.js";
// interface DeleteContentParams {
//   id?: string; // optional because you may also get it from req.body
// }

// import cors from "cors";

// const app = express();
// app.use(express.json());
// //added this from GPT
// app.use(express.urlencoded({ extended: true })); // optional but good
// app.use(cors());

// //express library u r creating then u have to write.d.ts

// //signup endpoint
// app.post("/api/v1/signup", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   try {
//     await UserModel.create({
//       username: username,
//       password: password,
//     });

//     res.json({
//       message: "User Signedup successfully",
//     });
//   } catch (e) {
//     res.status(411).json({
//       message: "User already exists",
//     });
//   }
// });

// //signin endpoint
// app.post("/api/v1/signin", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   const existingUser = await UserModel.findOne({
//     username,
//     password,
//   });

//   if (existingUser) {
//     const token = jwt.sign(
//       {
//         //has id encoded
//         id: existingUser._id,
//       },
//       JWT_PASSWORD,
//     );
//     res.json({
//       token,
//     });
//   } else {
//     res.status(403).json({
//       message: "Incorrect credentials",
//     });
//   }
// });

// //post content

// app.post("/api/v1/content", userMiddleware, async (req, res) => {
//   try {
//     const link = req.body.link;
//     const type = req.body.type;

//     if (!link || !type) {
//       return res.status(400).json({ message: "Link and type are required" });
//     }

//     // create content
//     const content = await ContentModel.create({
//       link,
//       type,
//       //@ts-ignore
//       userId: req.userId,
//       tags: [],
//     });

//     return res.json({
//       message: "Content added",
//       content, // return the saved document for confirmation
//     });
//   } catch (err) {
//     console.error("Error adding content:", err);
//     return res.status(500).json({ message: "Failed to add content" });
//   }
// });

// //get content
// app.get("/api/v1/content", userMiddleware, async (req, res) => {
//   try {
//     //@ts-ignore

//     const userId = req.userId;
//     const content = await ContentModel.find({
//       userId: userId,
//     }).populate({
//       path: "userId",
//       model: "users",
//       select: "username",
//     });

//     res.json({
//       content,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Error fetching content",
//       error: err,
//     });
//   }
// });

// //delete on content
// app.delete("/api/v1/content", userMiddleware, async (req, res) => {
//   try {
//     //@ts-ignore
//     const userId = req.userId;

//     // Get contentId from URL param or request body
//     const contentId = req.params.id || req.body.contentId;

//     if (!contentId) {
//       return res.status(400).json({ message: "Content ID is required" });
//     }

//     const result = await ContentModel.deleteOne({
//       _id: contentId,
//       userId: userId,
//     });

//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ message: "Content not found or not yours" });
//     }

//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting content", error: err });
//   }
// });

// //share
// app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
//   //only person is logged in then oly we shld allow share option

//   //evry user wl have sharable link and vice versa

//   const share = req.body.share;

//   if (share) {
//     const existingLink = await LinkModel.findOne({
//       userId: req.userId,
//     });

//     if (existingLink) {
//       hash: existingLink.hash;

//       return;
//     }

//     const hash = random(10);
//     await LinkModel.create({
//       userId: req.userId,
//       hash: hash,
//     });
//     res.json({
//       message: hash,
//     });
//   } else {
//     await LinkModel.deleteOne({
//       userId: req.userId,
//     });
//   }

//   res.json({
//     message: "Removed link",
//   });
// });

// //to get a specific shareable link

// app.get("/api/v1/brain/:shareLink", async (req, res) => {
//   const share = req.body.share;

//   if (share) {
//     // Check if the user already has a link
//     const existingLink = await LinkModel.findOne({
//       userId: req.userId,
//     });

//     if (existingLink) {
//       // If an existing link is found, return the existing hash
//       return res.json({
//         message: existingLink.hash, // Return the existing hash if the user already has a link
//       });
//     }

//     // If no link exists, create a new one with a random hash
//     const hash = random(10); // assuming `random(10)` generates a random string of length 10
//     const newLink = await LinkModel.create({
//       userId: req.userId,
//       hash: hash,
//     });

//     return res.json({
//       message: "Link created successfully",
//       hash: newLink.hash, // Return the newly created hash
//     });
//   } else {
//     // If share is false, delete the user's link
//     const deletedLink = await LinkModel.deleteOne({
//       userId: req.userId,
//     });

//     if (deletedLink.deletedCount > 0) {
//       return res.json({
//         message: "Link removed successfully",
//       });
//     } else {
//       return res.json({
//         message: "No link to remove",
//       });
//     }
//   }
// });

// // const PORT = 5000; // backend port
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // });
// app.listen(3000, () => {
//   console.log("🚀 Server running on http://localhost:3000");
// });

//@ts-ignore

import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import { summarizeContent } from "./gemini.js"; // Added import

interface DeleteContentParams {
  id?: string; // optional because you may also get it from req.body
}

import cors from "cors";

const app = express();
app.use(express.json());
//added this from GPT
app.use(express.urlencoded({ extended: true })); // optional but good
app.use(cors());

//express library u r creating then u have to write.d.ts

//signup endpoint
app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "User Signedup successfully",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

//signin endpoint
app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({
    username,
    password,
  });

  if (existingUser) {
    const token = jwt.sign(
      {
        //has id encoded
        id: existingUser._id,
      },
      JWT_PASSWORD,
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

//post content

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title; // Included title from body

    if (!link || !type) {
      return res.status(400).json({ message: "Link and type are required" });
    }

    // create content
    const content = await ContentModel.create({
      link,
      type,
      title,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });

    return res.json({
      message: "Content added",
      content, // return the saved document for confirmation
    });
  } catch (err) {
    console.error("Error adding content:", err);
    return res.status(500).json({ message: "Failed to add content" });
  }
});

//get content
app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    //@ts-ignore

    const userId = req.userId;
    const content = await ContentModel.find({
      userId: userId,
    }).populate({
      path: "userId",
      model: "users",
      select: "username",
    });

    res.json({
      content,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching content",
      error: err,
    });
  }
});

// AI Summarization endpoint (New)
app.post("/api/v1/summarize", userMiddleware, async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) {
      return res.status(400).json({ message: "Link is required" });
    }

    const summary = await summarizeContent(link);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: "AI Summarization failed" });
  }
});

//delete on content
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    //@ts-ignore
    const userId = req.userId;

    // Get contentId from URL param or request body
    const contentId = req.params.id || req.body.contentId;

    if (!contentId) {
      return res.status(400).json({ message: "Content ID is required" });
    }

    const result = await ContentModel.deleteOne({
      _id: contentId,
      userId: userId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Content not found or not yours" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting content", error: err });
  }
});

//share
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });

    if (existingLink) {
      return res.json({
        hash: existingLink.hash,
      });
    }

    const hash = random(10);
    await LinkModel.create({
      userId: req.userId,
      hash: hash,
    });
    res.json({
      message: hash,
    });
  } else {
    await LinkModel.deleteOne({
      userId: req.userId,
    });
    res.json({
      message: "Removed link",
    });
  }
});

//to get a specific shareable link

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink; // Fixed to use params correctly

  const link = await LinkModel.findOne({ hash });

  if (!link) {
    return res.status(411).json({ message: "Invalid link" });
  }

  const content = await ContentModel.find({ userId: link.userId });
  const user = await UserModel.findOne({ _id: link.userId });

  res.json({
    username: user?.username,
    content: content,
  });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    _id: contentId,
    userId: req.userId, // Security: prevents deleting others' data
  });

  res.json({
    message: "Deleted successfully",
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
