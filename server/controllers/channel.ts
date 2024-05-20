import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../errors";
import Channel from "../models/Channel";
import SubEvent from "../models/SubEvent";

const createChannel = async (req: Request, res: Response) => {
  const { channelName, subEventId } = req.body;
  if (!channelName || !subEventId) {
    throw new BadRequestError("Please provide hostId and eventId");
  }
  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new BadRequestError("user not found");
  }

  const subEvent = await SubEvent.findById(subEventId);

  if (!subEvent) {
    throw new BadRequestError("subEvent not found");
  }

  const channel = new Channel({
    channelName: channelName,
  });
  if (!channel) {
    throw new BadRequestError("cannot create channel");
  }

  subEvent.channels.push(channel._id);

  await subEvent.save();

  return res.status(500).json({
    channel: channel,
    subEvent: subEvent,
    msg: "new event created",
  });
};

const getChannel = async (req: Request, res: Response) => {
  const channelId = req.body;
  const channel = await Channel.findById(channelId);

  if (!channel) {
    throw new BadRequestError("channel not found");
  }

  return res.status(500).json({
    channel,
    msg: "list of all the channels",
  });
};

export { getChannel, createChannel };
