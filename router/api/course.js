const router = require('express').Router();
const CourseController = require('../controllers/CourseController');

// GET: Alle Kurse abrufen
router.get("/get", CourseController.getAllCourse);

// DELETE: Kurs löschen
router.delete("/delete", (req, res) => {
    // Hier wird nur eine erfolgreiche JSON-Antwort zurückgegeben, da die Implementierung des Löschvorgangs fehlt
    return res.status(200).json({ message: "Successful" });
});

// POST: Neuen Kurs erstellen
router.post("/create", (req, res) => {
    // Hier wird nur eine erfolgreiche JSON-Antwort zurückgegeben, da die Implementierung der Erstellung fehlt
    return res.status(200).json({ message: "Successful" });
});

// PUT: Kurs aktualisieren
router.put("/update", (req, res) => {
    // Hier wird nur eine erfolgreiche JSON-Antwort zurückgegeben, da die Implementierung der Aktualisierung fehlt
    return res.status(200).json({ message: "Successful" });
});

module.exports = router;                                                                                         