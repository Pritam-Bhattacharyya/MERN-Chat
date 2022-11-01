const express = require("express");
const {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

//Fetching Chats for perticular user
router.route("/").get(protect, fetchChats);
//Accessing private chat
router.route("/").post(protect, accessChats);

//Creation of group
router.route("/group").post(protect, createGroupChat);
//renaming groups
router.route("/group/rename").put(protect, renameGroupChat);

//add persons to groups
router.route("/group/add").put(protect, addToGroup);
//remove person or leaveing groups
router.route("/group/remove").put(protect, removeFromGroup);

module.exports = router;
