


export const facebook = {
  client_id:     157302798338265,
  client_secret: "c6d81a4697b98d352b8a6342e2ce076b"
}



export const getFacebookRedirectUri = location => {
  let { protocol, hostname, port } = location
  if( port == 8080 ) port = 8090
  if( hostname != "localhost" ) port = null
  return `${protocol}//${hostname}` + (port ? `:${port}` : "") + "/"
}
