const express = require('express');
const { getMembers, createMember,getMemberById, deleteMember } = require('../controllers/memberController');
const router = express.Router();
const {memberValidationRules, validate} = require('../middlewares/validationMiddlewares');

router.get('/', getMembers);
router.post('/', memberValidationRules(), validate, createMember);
router.get('/:id', getMemberById);
router.delete('/:id', deleteMember);

module.exports = router;