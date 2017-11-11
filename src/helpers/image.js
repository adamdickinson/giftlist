import { Buffer } from "buffer"
import axios from "axios"
import { db } from "./database"



export const fetchOne = keywords => get(keywords)
  .catch(() => search(keywords)
    .then(results => results.length 
      ? update(results[0], keywords) 
      : db.upsert(getId(keywords), doc => ({ type: "image", data: null }))
    )
    .then(() => get(keywords))
  )



export const get = keywords => db.get(getId(keywords))



export const getId = keywords => "image:" + keywords.toLowerCase().replace(/[^a-z0-9]+/g, "-")



export const search = keywords => axios.get(`https://pixabay.com/api/?key=3934523-59f81ff918b70de27c9d4995d&q=${encodeURIComponent(keywords)}&per_page=3`)
  .then(results => Promise.resolve(results.data.hits.map(hit => hit.previewURL)))



export const update = (url, keywords) => 
  axios.get(url, { responseType: "blob" })
    .then(response => db.upsert(getId(keywords), doc => ({ ...doc, type: "image", data: response.data })))
