const express = require('express');
const { getMembers, createMember,getMemberById, deleteMember, updateMember } = require('../controllers/memberController');
const router = express.Router();
const {validate, createMemberValidationRules, updateMemberValidationRules} = require('../middlewares/validationMiddlewares');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

router.get('/', getMembers);
router.post('/', upload.single('image'), createMemberValidationRules(), validate, createMember);
router.get('/:id', getMemberById);
router.delete('/:id', deleteMember);
router.put('/:id', updateMemberValidationRules(), validate, updateMember);

module.exports = router;