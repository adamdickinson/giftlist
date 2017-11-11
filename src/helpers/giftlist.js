import { db } from "./database"



export const get = user => db.get(`giftlist:${user.id}`)
  .catch(() => Promise.resolve({ owner: user, list: [] }))



export const getNot = user => db.allDocs({ include_docs: true, startkey: "giftlist:", endkey: "giftlist:\uffff" })
  .then(results => Promise.resolve(
    results.rows
      .map(row => row.doc)
      .filter(doc => doc._id != `giftlist:${user.id}`)
  ))
  .catch(() => Promise.resolve([]))



export const update = (user, giftlist) => db.upsert(
  `giftlist:${user.id}`, 
  doc => ({ 
    _id: `giftlist:${user.id}`, 
    type: "giftlist",
    owner: user,
    ...giftlist
  })
)
