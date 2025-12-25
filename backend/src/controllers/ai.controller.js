const codeReviewService = require("../services/code-review.service");
const notesService = require("../services/notes.services");

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).send("Prompt is required");
    }

    const response = await codeReviewService(code);

    res.send(response);
  } catch (err) {
    console.error("getReview error:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.aiNotes = async (req, res) => {
  try {
    const { subject, branch, semester, topic } = req.body;
    if (!subject || !branch || !semester || !topic) {
      return res.status(400).send("All fields are required");
    }

    const response = await notesService(subject, branch, semester, topic);
    res.send(response);
  } catch (err) {
    console.error("aiNotes error:", err);
    res.status(500).send("Internal Server Error");
  }
};
