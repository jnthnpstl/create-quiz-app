import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [quizNow, setQuizNow] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState({
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
  });

  const addItem = (e) => {
    e.preventDefault();

    let radios = document.getElementsByName("correct");
    let tempArray = Array(4);
    let index = 0;

    for (let radio of radios) {
      tempArray[index] = radio.checked;
      if (radio.checked) {
        radio.checked = !radio.checked;
      }
      index++;
    }

    setItems(() => [
      ...items,
      {
        question: input.question,
        choices: [
          {
            choice: input.choice1,
            isCorrect: tempArray[0],
          },
          {
            choice: input.choice2,
            isCorrect: tempArray[1],
          },
          {
            choice: input.choice3,
            isCorrect: tempArray[2],
          },
          {
            choice: input.choice4,
            isCorrect: tempArray[3],
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

    setCount(count + 1);
  };

  const startQuiz = () => {
    if (!items[0]) {
      alert("You need to add items");
      return;
    }
    setQuizNow(true);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const nextItem = (correct) => {
    if (correct) {
      setScore(score + 1);
    }
    if (currentItem >= count - 1) {
      setShowResult(!showResult);
      return;
    }

    return quizNow ? (
      showResult ? (
        <>
          <h1>You scored {score}!</h1>
        </>
      ) : (
        <>
          <div className="question-wrapper">
            <div className="question-field">
              <h1>{items[currentItem].question}</h1>
            </div>
            <div className="button-choices">
              {items[currentItem].choices.map((choice) => (
                <button
                  onClick={() => nextItem(choice.isCorrect)}
                  key={Math.floor(Math.random() * 1000)}
                >
                  {choice.choice}
                </button>
              ))}
            </div>
          </div>
        </>
      )
    ) : (
      <>
        <div className="form-wrapper">
          <div className="form-area">
            <form onSubmit={addItem}>
              <div className="question">
                <textarea
                  rows={5}
                  cols={40}
                  type="text"
                  placeholder={"Question"}
                  value={input.question}
                  onChange={handleChange}
                  name="question"
                />
              </div>

              <div className="choice">
                <input type="radio" name="correct" id="choice1" />
                <label htmlFor="choice1">
                  <input
                    type="text"
                    placeholder="Choices"
                    value={input.choice1}
                    onChange={handleChange}
                    name="choice1"
                  />
                </label>
              </div>

              <div className="choice">
                <input type="radio" name="correct" id="choice2" />
                <label htmlFor="choice2">
                  <input
                    type="text"
                    placeholder="Choices"
                    value={input.choice2}
                    onChange={handleChange}
                    name="choice2"
                  />
                </label>
              </div>

              <div className="choice">
                <input type="radio" name="correct" id="choice3" />
                <label htmlFor="choice3">
                  <input
                    type="text"
                    placeholder="Choices"
                    value={input.choice3}
                    onChange={handleChange}
                    name="choice3"
                  />
                </label>
              </div>
              <div className="choice">
                <input type="radio" name="correct" id="choice4" />
                <label htmlFor="choice4">
                  <input
                    type="text"
                    placeholder="Choices"
                    value={input.choice4}
                    onChange={handleChange}
                    name="choice4"
                  />
                </label>
              </div>
              <div className="buttons">
                <input type={"submit"} value="Add Item"></input>
                <h1>{count > 1 ? <>{count} items </> : <>{count} item</>} </h1>
                <button onClick={startQuiz}>Start Quiz</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
}
export default App;
