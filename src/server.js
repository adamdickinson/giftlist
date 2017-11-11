import express from "express"
import bodyParser from "body-parser"
import Facebook from "facebook-oauth-agent"
import cors from "cors"
import path from "path"

import * as oauthConfig from "./config/oauth"



const port = 8090
const app = express()
app.use(cors())
app.use(bodyParser.json())



app.post("/", (req, res) => {
  const location = { protocol: req.protocol + ":", hostname: req.hostname, port }
  const { code } = req.body

  const profile = Facebook({ 
    code, 
    ...oauthConfig.facebook,
    redirect_uri: req.get("origin") + "/" //oauthConfig.getFacebookRedirectUri(location)
  }, 
    (error, response) => {
      console.log(error)
      res.send(JSON.stringify({ id: response.id, first_name: response.first_name }))
    }
  )
})



app.use(express.static( path.join(__dirname, "public") ))
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")))
app.listen(port, () => console.log("Server listening..."))
