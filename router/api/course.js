const router = require('express').Router();
const CourseController = require('../controllers/CourseController');

router.get("/get", CourseController.getAllCourse);

router.delete("/delete", (req, res)=> {
    return res.status(200).json({message: "Successful"});
});

router.post("/create", (req, res) => {
    return res.status(200).json({message: "Successful"});
});

router.put("/update", (req, res)=> {
    return res.status(200).json({message: "Successful"});
});

module.exports = router;                                                                                            