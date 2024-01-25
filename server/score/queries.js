import db from "../db.js";

export const getAllScores = () => db("score").select("*")

export const getReviewScoreById = (scoreID) =>
  db("score")
    .where({ scoreID })
    .select("reviewScore")
    .first()
    .then((result) => result.reviewScore)

export const getQuizScoreById = (scoreID) =>
  db("score")
    .where({ scoreID })
    .select("quizScore")
    .first()
    .then((result) => result.quizScore)

export const getCourseScoreById = (scoreID) =>
  db("score")
    .where({ scoreID })
    .select("courseScore")
    .first()
    .then((result) => result.courseScore)

export const getTotalScoreById = (scoreID) =>

  db("score")
    .where({ scoreID })
    .select("totalScore")
    .first()
    .then((result) => result.totalScore)

export const updateReviewScoreById = (scoreID, newScore) => {
  const score = parseFloat(newScore)
  return db("score")
    .where({ scoreID })
    .update({ reviewScore: score })
    .returning("reviewScore")
}

export const updateQuizScoreById = (scoreID, newScore) => {
  const score = parseFloat(newScore)
  return db("score")
    .where({ scoreID })
    .update({ quizScore: score })
    .returning("quizScore")
};

export const updateCourseScoreById = (scoreID, newScore) => {
  const score = parseFloat(newScore)
  return db("score")
    .where({ scoreID })
    .update({ courseScore: score })
    .returning("courseScore")
};

export const updateTotalScoreById = (scoreID, newScore) => {
  const score = parseFloat(newScore)
  return db("score")
    .where({ scoreID })
    .update({ totalScore: score })
    .returning("totalScore")
};
