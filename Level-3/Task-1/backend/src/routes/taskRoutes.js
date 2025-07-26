const express = require('express')
const router = express.Router()

const {getTasks, getTaskById, deleteTask, updateTask, createTask} = require("../controllers/taskControllers")


router.route('/').get(getTasks).post(createTask)
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask)

module.exports = router
