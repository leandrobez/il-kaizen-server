const router = require('express').Router();
const Anamnese = require('../models/Anamnese');
//const { checkValidation } = require('../helpers/validation');
//const authMiddleware = require('../middleware/auth');

console.log('⚙️ Create all routes to anamnese');

//route to create a new anamnese
router.post('/create', async (req,res) => {
	let dataAnamnese = {
		studentID: req.body.studentID,
		studentName: req.body.studentName,
		dtNasc: req.body.dtNasc,
		ocupation: req.body.ocupation,
		target: req.body.target,
		physicalActivities: req.body.physicalActivities,
		health:req.body.health,
		pains: req.body.pains,
		surgeries:req.body.surgeries,
		medicines: req.body.medicines
	}

	const anamnese = new Anamnese(dataAnamnese)

	try{
		const savedAnamnese = await anamnese.save()

		return res.status(201).json({
			error: null,
			anamnese: anamnese._id
		})
	} catch(error){
		return res.status(400)
      .json({ 
      	error: true, 
      	message: { 
      		type: 'warning', 
      		value: error.errors 
      	} 
      });
	}
})

module.exports = router;
