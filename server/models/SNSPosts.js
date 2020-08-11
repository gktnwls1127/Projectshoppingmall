const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SNSPostsSchema = mongoose.Schema({
	writer: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	text: {
		type: String,
	},
	snapshots: {
		type: Array,
		default: [],
	},
	likes: {
		type: Number,
		default: 0,
	},
	views: {
		type: Number,
		default: 0,
	}, 
});

SNSPostsSchema.index({
    text: 'text'
},{
    weights: {
        text : 5
    }
})

const SNSPost = mongoose.model('SNSPost', SNSPostsSchema);

module.exports = { SNSPost };
