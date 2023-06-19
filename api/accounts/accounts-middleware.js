exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try {
    let {name,budget} = req.body;
    if (!name || !budget) {
      res.status(400).json({ message: "name and budget are required" }) ;
    } else if (name.trim().length <3 || name.trim().length>100 ) {
      res.status(400).json({ message: "name of account must be between 3 and 100" }) ;
    }else if (typeof budget !== "number") {
      res.status(400).json({ message: "budget of account must be a number" }) ;
    }else if(budget <0 || budget >1000000) { 
      res.status(400).json({ message: "budget of account is too large or too small" }) ;
    } else {
      next();
    }
  } catch (error) {
    next ( error);
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    // const  allAccounts = await accountModel.getAll();
    // const  isExist = allAccounts.filter(x => x.name == req.body.name);
    const isExist = await accountModel.getByNAme(req.body.name);
    if (isExist) { 
      res.status(400).json({ message: "that name is taken" });
      
    } else {
      next ();
    }

  } catch (error) {
    next(error);
  }
}

exports.checkAccountId =  async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const isExistAccount = await accountModel.getById(req.params.id);
     if (!isExistAccount) {
      res.status(404).json({ message: "account not found" })   ;   
     } else {
      req.existAccount = isExistAccount;
     }

  } catch (error) {
    next(error);
  }
}
