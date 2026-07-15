import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/backendapi.jsx";

function ResumeReviewPage() {

    const { resumeId } = useParams();

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchReview();

    }, []);

    async function fetchReview() {

        try {

            const response = await api.get(
                `/resume/review/${resumeId}`
            );

            setReview(response.data.review);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (
            <h1 className="text-center mt-20 text-xl">
                Loading...
            </h1>
        );

    }

    if (!review) {

        return (
            <h1 className="text-center mt-20 text-xl">
                Review not found.
            </h1>
        );

    }

    return (

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">

            <h1 className="text-3xl font-bold mb-8">
                Resume Review
            </h1>

            <div className="mb-8">
                <h2 className="text-gray-500">
                    Overall Score
                </h2>

                <p className="text-5xl font-bold text-blue-600">
                    {review.score}/100
                </p>
            </div>

            {review.user_prompt && (
                <div className="mb-6">
                    <h2 className="font-semibold text-xl mb-2">
                        Review Focus
                    </h2>

                    <p>{review.user_prompt}</p>
                </div>
            )}

            <div className="mb-6">
                <h2 className="font-semibold text-xl mb-2">
                    Strengths
                </h2>

                <p>{review.strengths}</p>
            </div>

            <div className="mb-6">
                <h2 className="font-semibold text-xl mb-2">
                    Weaknesses
                </h2>

                <p>{review.weaknesses}</p>
            </div>

            <div>
                <h2 className="font-semibold text-xl mb-2">
                    Suggestions
                </h2>

                <p>{review.suggestions}</p>
            </div>

        </div>

    );

}

export default ResumeReviewPage;