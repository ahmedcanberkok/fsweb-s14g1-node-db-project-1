const getAll = () => {
  // KODLAR BURAYA
  return db("accounts");
}

const getById = id => {
  // KODLAR BURAYA
  return db("accounts").where("id",id).first();
}
const getByName = name => {
  return db("accounts").where("name",name).first();
}
const create = async account => {
  // KODLAR BURAYA
const [id] =await db("acounts").insert(account); // Kullanıcı değer bekliyorsa await yazabiliriz.
return getById(id);
}

const updateById = async (id, account) => {
  // KODLAR BURAYA
  await db("accounts").update(account);
  return getById(id);
}

const deleteById = id => {
  // KODLAR BURAYA

return db('accounts').where("id",id).del() ;
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
