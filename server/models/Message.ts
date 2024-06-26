import mongoose from "mongoose";
import { IMessage } from "../types/models";

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      trim: true,
    },
    readBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    chat: {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
