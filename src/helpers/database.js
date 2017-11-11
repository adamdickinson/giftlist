import PouchDB from "pouchdb"
PouchDB.plugin(require("pouchdb-upsert"))



export let db       = new PouchDB("giftlist")
export let remoteDb = new PouchDB(`${window.location.protocol}//${window.location.hostname}:5984/giftlist`)
export let dbSync   = db.sync(remoteDb, { live: true, retry: true })



export const destroySession = () => db.upsert("_local/session", doc => ({ _id: "_local/session" }))



export const getSession = () => db.get("_local/session")



export let setSession = data => db.upsert(
  "_local/session", 
  doc => ({
    _id: "_local/session",
    ...doc,
    ...data 
  })
)
