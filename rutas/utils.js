function getId(req){
  let id = parseInt(req.params.id);
  if(typeof id !== 'number' || !id || id < 0){
    return null;
  }
  return id;
}

module.exports = { getId };
