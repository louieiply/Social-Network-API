const { Schema, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
    {
        reactionId:
        {
            type: Schema.Types.ObjectId,
            default: function(){
                return new Types.ObjectId();
            }
        },
        reactionBody:
        {
            type: String,
            required: true,
            maxLength: 280,
        },
        username:
        {
            type: String,
            requird: true,
        },
        createdAt:
        {
            type: Date,
            default: Date.now(),
            get: (created) => {moment(created).format('DD MMMM YYYY, h:mm a')},
        }
    }
);

module.exports = reactionSchema;