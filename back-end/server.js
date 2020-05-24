import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from "crypto"
import bcrypt from 'bcrypt-nodejs'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Setting up MongoDB database
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/messageBoard"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const User = mongoose.model('User', {
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const Message = mongoose.model('Message', {
  message: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
  },
  author: {
    // type: String
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailabale' })
  }
})

// MIDDLEWARE TO CHECK ACCESSTOKEN FOR USERS (IF THE USER MATCH ANY ACCESSTOKEN IN DB)
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header('Authorization') })
    if (user) {
      req.user = user;
      next()
    } else {
      res
        .status(401)
        .json({ loggedOut: true, message: 'Please try to log in again' })
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: 'accesToken missing or wrong', errors: err.errors })
  }
}
// Start defining your routes here
// app.get('/', (req, res) => {
//   res.send('Hello back end')
// })

//Create user
app.post('/users', async (req, res) => {
  try {
    const { userName, email, password } = req.body
    const user = new User({ userName, email, password: bcrypt.hashSync(password) })
    const saved = await user.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors })
  }
})

// Login session
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ userName: req.body.userName })
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken, userName: user.userName })
  } else {
    //Failure because user doesn't exist or encrypted password doesn't match
    res.status(400).json({ notFound: true })
  }
})


app.get('/messages', async (req, res) => {
  let messages = await Message.find()
    .sort({ createdAt: 'desc' })
  res.status(200).json(messages)
})

//POST/SEND INFORMATION IN A REQUEST
app.post('/messages', async (req, res) => {
  //Retrieve the information sent by the client to our API endpoint
  const { message, author, parentId } = req.body
  //use our mongoose model to create the database entry
  const postedMessage = new Message({ message, author, parentId })
  try {
    //Success
    const savedMessage = await postedMessage.save()
    res.status(204).json(savedMessage)
    console.log("saved message:", savedMessage)
  } catch (err) {
    //Bad request
    res.status(400).json({ message: 'Could not save message to the database', error: err.errors })
  }
})

// Finding single message and comment
// app.post("/messages/:id/reply", async (req, res) => {
//   //Retrieve the information sent by the client to our API endpoint
//   const parentId = req.params.id
//   const { message, author } = req.body
//   //use our mongoose model to create the database entry
//   const replyMessage = new Message({ message, author, parentId })
//   try {
//     //Success
//     const savedMessage = await replyMessage.save()
//     res.status(204).json(savedMessage)
//     console.log(savedMessage)
//   } catch (err) {
//     //Bad request
//     res.status(400).json({ message: 'Could not save reply to the database', error: err.errors })
//   }
// })


// Delete message
app.delete("/messages/:id", authenticateUser)
app.delete("/messages/:id", async (req, res) => {
  const messageId = req.params.id
  const author = req.body.author
  const userId = req.body.userId

  if (author === userId) {
    // console.log(req.body)
    // console.log("author", author)
    // console.log("userId", userId)
    // console.log("messID", messageId)
    try {
      const deletedMessage = await Message.findOneAndDelete({ _id: messageId, author })
      if (deletedMessage !== null) {
        res.status(200).json({ message: `Successfully deleted message with id: ${deletedMessage._id}` })
        console.log("delete1", deletedMessage)
      } else {
        console.log("delete2", deletedMessage)
        res.status(400).json({ errorMessage: "Couldn't delete message" })
      }
    } catch (err) {
      res.status(400).json({ errorMessage: "Couldn't delete message", error: err.errors })
      console.log(err)
    }
  }
  else {
    res.status(400).json({ errorMessage: "Couldn't delete someone else's message" })
    // console.log("not your comment")
  }
})


// PUT ROUTE FOR SPECIFIC message ID
app.put("/messages/:id", authenticateUser)
app.put('/messages/:id', async (req, res) => {
  const messageId = req.params.id
  const author = req.body.author
  const userId = req.body.userId

  if (author === userId) {
    try {
      const editedMessage = await Message.findOneAndUpdate({ _id: messageId }, req.body, { new: true })
      // res.status(201).json(editedMessage)
      // console.log(editedMessage)

      if (editedMessage !== null) {
        res.status(201).json(editedMessage)
        // res.status(201).json({ message: `Successfully edited message with id: ${editedMessage._id}` })
        console.log("Editmessage", editedMessage)
      } else {
        res.status(400).json({ errorMessage: "Couldn't edit message" })
        console.log("Editmessage2", editedMessage)
      }
    } catch (err) {
      res.status(400).json({ errorMessage: "Couldn't edit message", error: err.errors })
      console.log("3", err)
    }
  } else {
    res.status(400).json({ errorMessage: "Couldn't edit someone else's message" })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})


