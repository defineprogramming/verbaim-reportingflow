"use client";

function MainComponent() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [reportReason, setReportReason] = React.useState("");
  const [reportDescription, setReportDescription] = React.useState("");
  const [selectedTooltip, setSelectedTooltip] = React.useState(null);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);
  const handleReasonChange = (reason) => {
    setReportReason(reason);
    setSelectedTooltip(null);
  };
  const handleDescriptionChange = (event) => {
    setReportDescription(event.target.value);
  };
  const handleReportSubmit = async (event) => {
    event.preventDefault();
    new Promise((resolve) => setTimeout(resolve, 1000));
    nextPage();
  };
  const resetForm = () => {
    setCurrentPage(1);
    setReportReason("");
    setReportDescription("");
  };
  const toggleTooltip = (reason) => {
    setSelectedTooltip(selectedTooltip === reason ? null : reason);
  };
  const policyDescriptions = {
    spam: "Please report any unsolicited and/or repetitive actions that disrupt your experience.",
    abuse: "Report any behavior that is harassing, threatening, or bullying.",
    inappropriate_content:
      "Flag any content that is explicit, graphic, or offensive.",
    other: "Specify any other reasons not covered by the above options.",
  };
  let backButton =
    currentPage > 1 ? (
      <button
        onClick={prevPage}
        className="text-[#374151] px-4 py-2 rounded-xl bg-blue-200 font-roboto shadow-lg ml-4"
      >
        Back
      </button>
    ) : null;
  let content;
  const reasonButtons = ["Spam", "Abuse", "Inappropriate Content", "Other"].map(
    (reason, index) => {
      const reasonKey = reason.toLowerCase().replace(/\s/g, "_");
      const isSelected = reportReason === reasonKey;
      return (
        <button
          key={index}
          name="reason"
          value={reasonKey}
          onClick={() => handleReasonChange(reasonKey)}
          onMouseEnter={() => setSelectedTooltip(reasonKey)}
          onMouseLeave={() => setSelectedTooltip(null)}
          className={`w-full text-left transform transition-colors ${
            isSelected ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          } font-roboto py-2 px-4 rounded-xl hover:bg-blue-100`}
        >
          {reason}
          {selectedTooltip === reasonKey && (
            <span className="absolute inline-block w-[250px] px-3 py-1.5 -ml-8 -mt-16 text-xs text-white bg-black rounded-md shadow-lg">
              {policyDescriptions[reasonKey]}
            </span>
          )}
        </button>
      );
    }
  );
  if (currentPage === 1) {
    content = (
      <div className="space-y-4 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          {reasonButtons}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={nextPage}
            disabled={!reportReason}
            className="text-white px-6 py-2 rounded-xl bg-blue-600 font-roboto shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    );
  } else if (currentPage === 2) {
    content = (
      <form onSubmit={handleReportSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            name="description"
            value={reportDescription}
            onChange={handleDescriptionChange}
            rows="4"
            className="block w-full p-4 rounded-xl font-roboto text-gray-700 bg-white shadow-md resize-none"
            placeholder="Provide a detailed description"
            onFocus={() => setSelectedTooltip("description")}
            onBlur={() => setSelectedTooltip(null)}
          ></textarea>
          {selectedTooltip === "description" && (
            <span className="absolute inline-block w-[300px] px-3 py-1.5 text-xs text-white bg-black rounded-md shadow-lg -bottom-3 right-0">
              Describe the issue with specifics such as time, context, and why
              you believe it violates Verbatim's policies.
            </span>
          )}
        </div>
        <div className="flex justify-end items-center">
          {backButton}
          <button
            type="submit"
            className="text-white px-6 py-2 rounded-xl bg-blue-600 font-roboto shadow-lg"
          >
            Submit
          </button>
        </div>
      </form>
    );
  } else if (currentPage === 3) {
    content = (
      <div className="flex flex-col items-center justify-center">
        <div className="mb-2">
          <div className="checkmark">{"✔"}</div>
        </div>
        <h2 className="text-3xl font-semibold font-roboto text-gray-800 my-4">
          Report Submitted
        </h2>
        <p className="text-center text-sm font-roboto text-gray-600 leading-relaxed px-6">
          Thank you for reporting. Our team at Verbatim will review your
          submission and take appropriate action swiftly.
        </p>
        <button
          onClick={resetForm}
          className="mt-6 text-white px-6 py-2 rounded-xl bg-emerald-500 font-roboto shadow-lg"
        >
          Submit Another Report
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-4">
      <div className="w-full max-w-3xl px-12 py-12 bg-white shadow-xl rounded-2xl transform transition duration-500 ease-in-out">
        <h1 className="text-5xl font-bold font-roboto text-blue-900 mb-10 text-center">
          Verbatim Report Center
        </h1>
        {currentPage < 3 && (
          <div className="transition-opacity duration-500">{content}</div>
        )}
        {currentPage === 3 && content}
      </div>
      <style jsx global>{`
        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          background: #10B981;
          color: white;
          animation: checkmark 1s ease-in-out both;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;