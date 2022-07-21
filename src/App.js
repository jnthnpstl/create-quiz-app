import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [quizNow, setQuizNow] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [input, setInput] = useState({
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
  });

  const [correct, setCorrect] = useState({
    correct1: false,
    correct2: false,
    correct3: false,
    correct4: false,
  });

  const addItem = () => {
    if (
      input.choice1 === "" ||
      input.choice2 === "" ||
      input.choice3 === "" ||
      input.choice4 === ""
    ) {
      alert("You need to provide choices in the field!");
      return;
    }
    setItems(() => [
      ...items,
      {
        question: input.question,
        choices: [
          {
            choice: input.choice1,
            isCorrect: correct.correct1,
          },
          {
            choice: input.choice2,
            isCorrect: correct.correct2,
          },
          {
            choice: input.choice3,
            isCorrect: correct.correct3,
          },
          {
            choice: input.choice4,
            isCorrect: correct.correct4,
          },
        ],
      },
    ]);

    setInput({
      question: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
    });

    console.log(correct);

    setCorrect({
      correct1: false,
      correct2: false,
      correct3: false,
      correct4: false,
    });

    setCount(count + 1);
  };

  const startQuiz = () => {
    if (!items[0]) {
      alert("You need to add items");
      return;
    }
    setQuizNow(true);
  };

  const handlCorrectAnswer = (e) => {
    let temp = JSON.parse(e.target.value);
    setCorrect({
      ...correct,
      [e.target.name]: !temp,
    });
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const nextItem = (correct) => {
    if (correct === true) {
      setScore(score + 1);
    }

    if (currentItem >= count - 1) {
      setShowResult(!showResult);
      return;
    }

    setCurrentItem(currentItem + 1);
  };

  return quizNow ? (
    showResult ? (
      <>
        <h1>You scored {score}!</h1>
      </>
    ) : (
      <>
        <h1>{items[currentItem].question}</h1>
        {items[currentItem].choices.map((choice) => (
          <button
            onClick={() => nextItem(choice.isCorrect)}
            key={Math.floor(Math.random() * 1000)}
          >
            {choice.choice}
          </button>
        ))}
      </>
    )
  ) : (
    <>
      <div className="form-wrapper">
        <h1>Input your question</h1>
        <div className="form">
          <form className="question">
            <textarea
              rows="5"
              cols="40"
              placeholder={"Question"}
              value={input.question}
              onChange={handleChange}
              name="question"
            ></textarea>
          </form>
          <div className="choices-wrapper">
            <h3>
              Please input choices and toggle checkboxes of the correct answers
            </h3>
            <form className="choices">
              <div className="input-field">
                <input
                  className="checkbox"
                  type="checkbox"
                  value={correct.correct1}
                  name="correct1"
                  checked={correct.correct1}
                  onClick={handlCorrectAnswer}
                />
                <input
                  size={"25"}
                  type="text"
                  placeholder="Choices"
                  value={input.choice1}
                  onChange={handleChange}
                  name="choice1"
                />
              </div>
            </form>

            <form className="choices">
              <div className="input-field">
                <input
                  className="checkbox"
                  type="checkbox"
                  value={correct.correct2}
                  name="correct2"
                  checked={correct.correct2}
                  onClick={handlCorrectAnswer}
                />
                <input
                  size={"25"}
                  type="text"
                  placeholder="Choices"
                  value={input.choice2}
                  onChange={handleChange}
                  name="choice2"
                />
              </div>
            </form>
            <form className="choices">
              <div className="input-field">
                <input
                  className="checkbox"
                  type="checkbox"
                  value={correct.correct3}
                  name="correct3"
                  checked={correct.correct3}
                  onClick={handlCorrectAnswer}
                />
                <input
                  size={"25"}
                  type="text"
                  placeholder="Choices"
                  value={input.choice3}
                  onChange={handleChange}
                  name="choice3"
                />
              </div>
            </form>
            <form className="choices">
              <div className="input-field">
                <input
                  className="checkbox"
                  type="checkbox"
                  value={correct.correct4}
                  name="correct4"
                  checked={correct.correct4}
                  onClick={handlCorrectAnswer}
                />
                <input
                  size={"25"}
                  type="text"
                  placeholder="Choices"
                  value={input.choice4}
                  onChange={handleChange}
                  name="choice4"
                />
              </div>
            </form>
          </div>
          <div className="button-wrapper">
            <button onClick={addItem}>Add Item</button>
            <h1>{count > 1 ? <>{count} items </> : <>{count} item</>} </h1>
            <button onClick={startQuiz}>Start Quiz</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
