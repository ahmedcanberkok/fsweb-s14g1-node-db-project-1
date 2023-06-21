const router = require('express').Router();
const accountModel =require("./accounts-model");
const mw = require("./accounts-middleware");

router.get('/', async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const allAccounts = await accountModel.getAll();
    res.json(allAccounts);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', mw.checkAccountId, (req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.existAccount);
  } catch (error) {
    next(error);
  }
})

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  // KODLAR BURAYA
  try {
      const insertAccountModel = {
        name: req.body.name,
        budget:req.body.budget
      }
      const insertAccount = await accountModel.create(insertAccountModel);
      res.status(201).json(insertAccount);
  } catch (error) {
    next(error);
    
  }
})

router.put('/:id', mw.checkAccountId,mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const updateAccountModel = {
      name: req.body.name,
      budget:req.body.budget
    }
    const updatedAccount = await accountModel.updateById(req.params.id,updateAccountModel);
    res.status(200).json(updatedAccount);
} catch (error) {
  next(error);
  
}

});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountModel.deleteById(req.params.id);
    res.json({message : `${req.params.id}'li kayıt silindi.`})
  } catch (error) {
    next(error);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // KODLAR BURAYA
  res.status((err.status || 500)).json({
    customMessage : "Global error handler üzerinde hata oluştu",
    message : err.message 
  })
})

module.exports = router;
