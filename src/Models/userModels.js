import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  admin_status:{
    type:Boolean,
    default:false
  },
  
});

// Fix: Ensure model caching is case-sensitive
let User = mongoose.models.User || mongoose.model("User", userSchema);

// Topic Schema
const topicSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  delete_status:{
    type:Boolean,
    default:false
  },
  date_time:{
    type:Date,
    default:Date.now
  }

});

// Ensure Topic model is only created once
const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

const historySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },  
  action: {
    type: String,
  },  
  date_time:{
    type:Date,
    default:Date.now
  }
})

const History = mongoose.models.History || mongoose.model("History", historySchema);

// Export models
export { User, Topic, History};
