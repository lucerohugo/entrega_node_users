const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
} = require('../controllers/users.controller');

//rutas
router.get('/', getUsers);
router.get('/:id', getUsersById);
router.post('/', createUsers);
router.put('/:id', updateUsers);
router.delete('/:id', deleteUsers);

module.exports = router;
