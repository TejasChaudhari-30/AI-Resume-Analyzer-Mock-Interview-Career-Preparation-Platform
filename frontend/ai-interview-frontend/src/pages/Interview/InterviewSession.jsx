import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../api/backendapi.jsx";

function InterviewSession() {

    const { sessionId } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    const questions = location.state?.questions || [];

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState(

        questions.map((q) => ({

            questionId: q.id,

            answer: ""

        }))

    );

    if (questions.length === 0) {

        return (

            <div className="text-center mt-20">

                No Interview Found

            </div>

        );

    }

    function handleAnswerChange(e) {

        const temp = [...answers];

        temp[currentQuestion].answer = e.target.value;

        setAnswers(temp);

    }

    function nextQuestion() {

        if (currentQuestion < questions.length - 1)

            setCurrentQuestion(currentQuestion + 1);

    }

    function previousQuestion() {

        if (currentQuestion > 0)

            setCurrentQuestion(currentQuestion - 1);

    }

    async function submitInterview() {

        try {

            const response = await api.post(

                `/interview/evaluate/${sessionId}`,

                {

                     answers

                }

            );

            navigate(

                `/interview/result/${sessionId}`

            );

        }
        catch (error) {

            console.log(error.response?.data);

        }

    }

    const current = questions[currentQuestion];

    return (

        <div className="max-w-4xl mx-auto p-8">

            <div className="flex justify-between mb-6">

                <h1 className="text-3xl font-bold">

                    AI Interview

                </h1>

                <span>

                    {currentQuestion + 1} / {questions.length}

                </span>

            </div>

            <div className="mb-6">

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                    {current.category}

                </span>

            </div>

            <div className="bg-white rounded-xl shadow p-8 mb-8">

                <h2 className="text-xl font-semibold">

                    {current.question}

                </h2>

            </div>

            <textarea

                rows={8}

                value={answers[currentQuestion].answer}

                onChange={handleAnswerChange}

                placeholder="Write your answer..."

                className="w-full border rounded-lg p-4"

            />

            <div className="flex justify-between mt-8">

                <button

                    onClick={previousQuestion}

                    disabled={currentQuestion === 0}

                    className="px-6 py-3 rounded-lg bg-gray-300 disabled:opacity-50"

                >

                    Previous

                </button>

                {

                    currentQuestion === questions.length - 1

                    ?

                    <button

                        onClick={submitInterview}

                        className="px-6 py-3 rounded-lg bg-green-600 text-white"

                    >

                        Submit Interview

                    </button>

                    :

                    <button

                        onClick={nextQuestion}

                        className="px-6 py-3 rounded-lg bg-blue-600 text-white"

                    >

                        Next

                    </button>

                }

            </div>

        </div>

    );

}

export default InterviewSession;