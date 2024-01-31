import Quiz from '../scripts/quizSchema.cjs'
import * as queries from '../teachers/queries.js'
import * as query from '../students/queries.js'
import fs from 'fs'
import jsonFile from "../16mbti.json" assert { type: "json" };
import emojson from "../emotion.json" assert { type: "json" };

export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body)
    const result = await quiz.save()
    res.status(200).send(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
    console.log(quizzes)
    res.status(200).send(quizzes)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getPublishedQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isPublished: true })
    res.status(200).send(quizzes)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID, {
      name: 1,
      questionList: 1,
      answerList: 1,
    })

    if (!quiz) {
      throw new Error('Quiz Not Found')
    }
    // if req.userID != quiz.createdBy, unauthorized access

    res.status(200).send(quiz)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID)

    if (!quiz) {
      throw new Error('Quiz Not Found')
    }
    if (quiz.isPublished) {
      throw new Error('Can not update a published quiz!')
    }

    quiz.name = req.body.name
    quiz.questionList = req.body.questionList
    quiz.answerList = req.body.answerList
    await quiz.save()

    res.status(200).send(quiz)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID)
    if (quiz.isPublished) {
      throw new Error('Can not delete a published quiz!')
    }
    await Quiz.deleteOne({ _id: req.params.quizID })
    res.status(200).send('Quiz Deleted Successfully')
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const publishQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID)

    if (!quiz) {
      throw new Error('Quiz Not Found')
    }

    quiz.isPublished = true
    await quiz.save()

    res.status(200).send(quiz)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// export const getAllMbtiQuestions = async (req, res) => {
//   try {
//     const { questionList } = await Quiz.findOne({ name: 'Personality finder' }); 
//     res.status(200).json(questionList);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }


export const submitMbtiAnswers = async (req, res) => {
    try {
      let id;
      let updateQuery;
      if (req.user.studentID) {
        id = req.user.studentID
        updateQuery = query.updatembti
      } else {
        id = req.user.teacherID
        updateQuery = queries.updatembti
      }
  
    const answers = req.body.answers

    let I = 0, E = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;

    for (const answer of answers) {
      switch (answer) {
        case 'I':
          I++;
          break;
        case 'E':
          E++;
          break;
        case 'S':
          S++;
          break;
        case 'N':
          N++;
          break;
        case 'T':
          T++;
          break;
        case 'F':
          F++;
          break;
        case 'J':
          J++;
          break;
        case 'P':
          P++;
          break;
        default:
          break;
      }
    }

    const mbtiType = `${E > I ? 'E' : 'I'}${S > N ? 'S' : 'N'}${T > F ? 'T' : 'F'}${J > P ? 'J' : 'P'}`;

    const personalityInfo = {
      'ISTJ': {
        type: 'ISTJ',
        description: 'Introversion, Sensing, Thinking, Judging',
        traits: [
          'Tend to be more quiet and serious',
          'Realistic, responsible and practical',
          'Earns success by being dependable and thorough',
          'Enjoys order and organization'
        ]
      },
      'ISFJ': {
        type: 'ISFJ',
        description: 'Introversion, Sensing, Feeling, Judging',
        traits: [
          'Quiet and conscientious',
          'Committed to meeting obligations',
          'Friendly, loyal and considerate of others’ feelings',
          'Values order and harmony in their home and work environments'
        ]
      },
      'INFJ': {
        type: 'INFJ',
        description: 'Introversion, Intuition, Feeling, Judging',
        traits: [
          'Concerned with serving the common good',
          'Insightful and eager to learn others’ motivations',
          'Tends to seek meaning and connection in relationships and ideas',
          'Committed to their values'
        ]
      },
      'INTJ': {
        type: 'INTJ',
        description: 'Introversion, Intuition, Thinking, Judging',
        traits: [
          'Original thinkers who are motivated to achieve their goals',
          'Identifies patterns in events to determine an explanatory perspective',
          'Skeptical and independent',
          'Maintains high standards for themselves and others'
        ]
      },
      'ISTP': {
        type: 'ISTP',
        description: 'Introversion, Sensing, Thinking, Perceiving',
        traits: [
          'Quiet, sensitive and kind',
          'Committed to their values and people who are important to them',
          'Enjoys being alone and working at their own pace',
          'Conflict-averse'
        ]
      },
      'ISFP': {
        type: 'ISFP',
        description: 'Introversion, Sensing, Feeling, Perceiving',
        traits: [
          'Tolerant, flexible and logical',
          'Quick to find workable solutions for problems',
          'Interested in cause and effect',
          'Values efficiency'
        ]
      },
      'INFP': {
        type: 'INFP',
        description: 'Introversion, Intuition, Feeling, Perceiving',
        traits: [
          'Idealistic, curious and adaptable',
          'Loyal to their values and people who are important to them',
          'Eager to understand others and help them reach their full potential',
          'Seeks to live a life that aligns with their values'
        ]
      },
      'INTP': {
        type: 'INTP',
        description: 'Introversion, Intuition, Thinking, Perceiving',
        traits: [
          'Theoretical, analytical and skeptical',
          'Interested in developing logical explanations for things that interest them',
          'Values ideas over social interaction',
          'Problem solvers'
        ]
      },
      'ESTP': {
        type: 'ESTP',
        description: 'Extraversion, Sensing, Thinking, Perceiving',
        traits: [
          'Spontaneous, lives in the moment',
          'Prefer action when problem-solving over theoretical explanations',
          'Enjoys aesthetics and material comfort',
          'Learns by doing'
        ]
      },
      'ESFP': {
        type: 'ESFP',
        description: 'Extraversion, Sensing, Thinking, Perceiving',
        traits: [
          'Enjoys working with others',
          'Spontaneous and easily adapts to new people and environments',
          'Realistic, outgoing and accepting',
          'Learns best while trying a new skill with other people'
        ]
      },
      'ENFP': {
        type: 'ENFP',
        description: 'Extraversion, Intuition, Feeling, Perceiving',
        traits: [
          'Warm, enthusiastic and imaginative',
          'Desires affirmation from others',
          'Eager to offer appreciation and support',
          'Spontaneous, flexible, able to improvise'
        ]
      },
      'ENTP': {
        type: 'ENTP',
        description: 'Extraversion, Intuition, Thinking, Perceiving',
        traits: [
          'Smart, outspoken and stimulating',
          'Resourceful when solving problems',
          'Good at reading other people',
          'Finds routine boring, often finds new ways of doing things'
        ]
      },
      'ESTJ': {
        type: 'ESTJ',
        description: 'Extraversion, Sensing, Thinking, Judging',
        traits: [
          'Practical, decisive and organized',
          'Values achieving results in the most efficient way possible',
          'Quick and forceful in implementing plans and decisions',
          'Maintains clear and logical standards for themselves and others'
        ]
      },
      'ESFJ': {
        type: 'ESFJ',
        description: 'Extraversion, Sensing, Feeling, Judging',
        traits: [
          'Cooperative, conscientious and kind',
          'Values harmony in their environment',
          'Desires appreciation for their contributions',
          'Enjoys working with others to complete tasks efficiently and accurately'
        ]
      },
      'ENFJ': {
        type: 'ENFJ',
        description: 'Extraversion, Intuition, Feeling, Judging',
        traits: [
          'Empathetic, responsible and loyal',
          'Attuned to others’ emotions, needs and motivations',
          'Often acts as a catalyst for individual and community growth',
          'Responsive to praise and criticism'
        ]
      },
      'ENTJ': {
        type: 'ENTJ',
        description: 'Extraversion, Intuition, Thinking, Judging',
        traits: [
          'Enjoys long-term planning and goal-setting',
          'Often well-informed, well-read and eager to share their knowledge with others',
          'Skilled problem-solvers',
          'Readily assumes leadership, forceful in sharing their ideas'
        ]
      }
    }

  const updatedRecord = await updateQuery(id, mbtiType)


    const personality = personalityInfo[mbtiType]

    console.log(mbtiType)
    res.status(200).json({ mbtiType, personality });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const SubmitEQAnswers = async (req, res) => {
  try {
    const answers = req.body.answers;

    const scoreMap = {
      "A": 1,
      "B": 2,
      "C": 3,
      "D": 4
    };

    let totalScore = 0;

    for (const answer of answers) {
      const questionScore = scoreMap[answer];
      totalScore += questionScore;
    }

    let guidance = "";
    if (totalScore >= 30) {
      guidance = "Your EQ level is excellent!";
    } else if (totalScore >= 20) {
      guidance = "Your EQ level is good, but there's room for improvement.";
    } else if (totalScore >= 10) {
      guidance = "Your EQ level is moderate. Consider working on areas of weakness.";
    } else {
      guidance = "Your EQ level needs improvement. Focus on developing emotional intelligence skills.";
    }

    res.status(200).json({ totalScore, guidance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPersonalityQuiz = async (req, res) => {
  try {
    // fs.readFile("../16mbti.json", (err, data) => {
    //   if (!err) {
    //     const jsonFile = JSON.parse(data)
    //   }
    // })

    console.log(jsonFile);
    res.status(200).json(jsonFile);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

export const getEmoQuiz = async (req, res) => {
  try {
    // fs.readFile("../16mbti.json", (err, data) => {
    //   if (!err) {
    //     const jsonFile = JSON.parse(data)
    //   }
    // })

    console.log(emojson);
    res.status(200).json(emojson);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}
