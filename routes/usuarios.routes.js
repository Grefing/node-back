const { Router } = require('express');
const { createUser, getUsers, getUserById, deleteUser, deleteUserFisically, deleteUserLogically } = require('../controllers/usuarios.controllers');
const router = Router();


router.post('/', createUser);
router.get('/', getUsers);
router.get('/:idUser', getUserById)
router.delete('/:idUser', deleteUserFisically)
router.put('/:idUser', deleteUserLogically)

module.exports = router;
