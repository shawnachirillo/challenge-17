import { Schema, model, Types } from 'mongoose';

const { Schema: MongooseSchema, model: MongooseModel, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new MongooseSchema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new MongooseSchema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function (this: { reactions: { length: number }[] }) {
  return this.reactions.length;
});

const ThoughtModel = MongooseModel('Thought', thoughtSchema);

module.exports = ThoughtModel;

export const Thought = model('Thought', thoughtSchema);
function model(arg0: string, thoughtSchema: any) {
  throw new Error("Function not implemented.");
}

export const thought = model('Thought', thoughtSchema);

