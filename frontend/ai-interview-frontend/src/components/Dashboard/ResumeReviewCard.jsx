import { Link } from "react-router-dom";

function ResumeReviewCard({ review }) {

    if (!review) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    Latest Resume Review
                </h2>

                <p className="text-gray-500">
                    No resume review available.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-semibold mb-4">
                Latest Resume Review
            </h2>

            <div className="space-y-4">

                <div>
                    <p className="text-gray-500 text-sm">
                        Overall Score
                    </p>

                    <p className="text-3xl font-bold text-green-600">
                        {review.score}/100
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">
                        Strengths
                    </h3>

                    <p className="text-gray-700">
                        {review.strengths}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">
                        Weaknesses
                    </h3>

                    <p className="text-gray-700">
                        {review.weaknesses}
                    </p>
                </div>

            </div>

          <Link
    to={`/resume/review/${review.resume_id}`}
    className="inline-block mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
    View Full Review
</Link>

        </div>
    );
}

export default ResumeReviewCard;