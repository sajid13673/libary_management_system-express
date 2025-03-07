const express = require('express');
const { getMembers, createMember,getMemberById, deleteMember, updateMember } = require('../controllers/memberController');
const router = express.Router();
const {validate, createMemberValidationRules, updateMemberValidationRules} = require('../middlewares/validationMiddlewares');
const multer = require('multer');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload = multer({dest: 'uploads/'})

router.use(roleMiddleware('admin'));
router.get('/', getMembers);
router.post('/', upload.single('image'), createMemberValidationRules(), validate, createMember);
router.get('/:id', getMemberById);
router.delete('/:id', deleteMember);
router.put('/:id', upload.single('image'), updateMemberValidationRules(), validate, updateMember);

module.exports = router;