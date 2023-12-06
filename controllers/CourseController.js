const { tbl_course, tbl_category, tbl_author } = require('../models');

const CourseController = {
  // GET: Alle Kurse abrufen
  getAllCourse: async (req, res) => {
    try {
      const courses = await tbl_course.findAll();
      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // POST: Neuen Kurs erstellen
  createCourse: async (req, res) => {
    const { title, fk_category_id, cost, Language, tbl_author_id } = req.body;
    try {
      // Erstelle einen neuen Kurs in der Datenbank
      const newCourse = await tbl_course.create({
        title,
        fk_category_id,
        cost,
        Language,
        tbl_author_id,
      });
      res.status(201).json(newCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // PUT: Kurs bearbeiten
  updateCourse: async (req, res) => {
    const courseId = req.params.id;
    const { title, fk_category_id, cost, Language, tbl_author_id } = req.body;
    try {
      // Aktualisiere den Kurs in der Datenbank
      const updatedCourse = await tbl_course.update(
        {
          title,
          fk_category_id,
          cost,
          Language,
          tbl_author_id,
        },
        {
          where: { id: courseId },
        }
      );
      res.status(200).json(updatedCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // DELETE: Kurs löschen
  deleteCourse: async (req, res) => {
    const courseId = req.params.id;
    try {
      // Lösche den Kurs aus der Datenbank
      await tbl_course.destroy({
        where: { id: courseId },
      });
      res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = CourseController;