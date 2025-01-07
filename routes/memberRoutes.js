const express = require('express');
const { getMembers, createMember,getMemberById, deleteMember, updateMember } = require('../controllers/memberController');
const router = express.Router();
const {validate, createMemberValidationRules, updateMemberValidationRules} = require('../middlewares/validationMiddlewares');

router.get('/', getMembers);
router.post('/', createMemberValidationRules(), validate, createMember);
router.get('/:id', getMemberById);
router.delete('/:id', deleteMember);
router.put('/:id', updateMemberValidationRules(), validate, updateMember);

module.exports = router;