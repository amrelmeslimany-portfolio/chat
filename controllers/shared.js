const { request, response } = require("express");
const User = require("../models/User");

const search = async (req = request, res = response) => {
  const myid = req.user._id;
  const { q } = req.query;
  if (!q) return res.status(400).json("You must enter the search letters");
  try {
    let users = await User.aggregate([
      {
        $addFields: {
          fullName: { $concat: ["$firstname", " ", "$lastname"] },
        },
      },

      {
        $match: {
          _id: { $ne: myid },
          $or: [
            { username: { $regex: q.trim(), $options: "i" } },
            { fullName: { $regex: q.trim(), $options: "i" } },
          ],
        },
      },
      {
        $project: {
          username: 1,
          profileImg: "$profileImg.url",
          fullName: 1,
        },
      },
      {
        $lookup: {
          from: "conversations",
          let: { userId: "$_id", myId: myid },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $in: [
                        "$$myId",
                        { $ifNull: ["$members", []] }, // To handle cases where 'members' is missing or null
                      ],
                    },
                    {
                      $in: [
                        "$$userId",
                        { $ifNull: ["$members", []] }, // To handle cases where 'members' is missing or null
                      ],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: "chats",
        },
      },
    ]);

    res.status(200).json({ users, total: users.length });
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Post all search: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

module.exports = {
  search,
};
