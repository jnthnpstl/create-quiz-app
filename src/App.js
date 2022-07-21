import { useEffect, useState } from "react";
import "./App.css";
import Item from "./components/Item";

function App() {
  const [items, setItems] = useState([]);
  const [quizNow, setQuizNow] = useState(false);
  const [count, setCount] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
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
    setQuizNow(true);
  };

  const handlCorrectAnswer = (e) => {
    let temp = JSON.parse(e.target.value);
    setCorrect({
      ...correct,
      [e.target.name]: !temp,
    });
    console.log(e.target.defaultChecked);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const nextItem = () => {
    if (currentItem >= count - 1) {
      setShowResult(!showResult);
      return;
    }
    setCurrentItem(currentItem + 1);
  };

  const handleCheckBox = () => {
    console.log("Hello");
  };

  return quizNow ? (
    showResult ? (
      <>
        <h1>You scored Nothing!</h1>
      </>
    ) : (
      <>
        <h1>{items[currentItem].question}</h1>
        {items[currentItem].choices.map((choice) => (
          <button key={Math.floor(Math.random() * 1000)}>
            {choice.choice}
          </button>
        ))}
        <button onClick={nextItem}>Next Question</button>
      </>
    )
  ) : (
    <>
      <form>
        <input
          type="text"
          placeholder={"Question"}
          value={input.question}
          onChange={handleChange}
          name="question"
        />
      </form>
      <form>
        <input
          type="checkbox"
          value={correct.correct1}
          name="correct1"
          checked={false}
          onChange={handlCorrectAnswer}
        />
        <input
          type="text"
          placeholder="Choices"
          value={input.choice1}
          onChange={handleChange}
          name="choice1"
        />
      </form>

      <form>
        <input
          type="checkbox"
          value={correct.correct2}
          name="correct2"
          onClick={handlCorrectAnswer}
        />
        <input
          type="text"
          placeholder="Choices"
          value={input.choice2}
          onChange={handleChange}
          name="choice2"
        />
      </form>
      <form>
        <input
          type="checkbox"
          value={correct.correct3}
          name="correct3"
          onClick={handlCorrectAnswer}
        />
        <input
          type="text"
          placeholder="Choices"
          value={input.choice3}
          onChange={handleChange}
          name="choice3"
        />
      </form>
      <form>
        <input
          type="checkbox"
          value={correct.correct4}
          name="correct4"
          onClick={handlCorrectAnswer}
        />
        <input
          type="text"
          placeholder="Choices"
          value={input.choice4}
          onChange={handleChange}
          name="choice4"
        />
      </form>
      <button onClick={addItem}>Add Item</button>
      <h1>{count > 1 ? <>{count} items </> : <>{count} item</>} </h1>
      <button onClick={startQuiz}>Start Quiz</button>
    </>
  );
}

export default App;
