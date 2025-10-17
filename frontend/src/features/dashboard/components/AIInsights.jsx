import React from 'react';

const AIInsights = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* AI Insight Card with Gradient Border */}
      <div className="p-[2px] rounded-xl bg-gradient-to-r from-theme-blue via-blue-500 to-blue-600">
        <div className="bg-theme-lightest-blue rounded-xl p-5 text-sm min-h-[150px] flex flex-col justify-between">
          <h3 className="text-md font-semibold text-gray-800 mb-2">AI Summary</h3>
          <p className="text-gray-700 leading-relaxed">
            The AI has analyzed your debt data and found that the top 3 debtors account for nearly half of the total outstanding debts. There are 12 debts overdue by more than 30 days, and sending reminders mid-week has shown a 25% higher payment completion rate. Most unpaid debts are under 5,000 PHP, but high-value debts contribute significantly to the total, so prioritizing follow-ups on top contributors is recommended. AI also suggests encouraging partial payments for overdue debts to improve collection efficiency.
          </p>
        </div>
      </div>

      {/* Run Insights Button */}
      <button
        className="flex items-center justify-center w-full p-3 bg-gradient-to-r from-theme-blue to-blue-700 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-800 transition cursor-pointer"
      >
        Run Insights
      </button>

      {/* Powered by Gemini AI */}
      <p className="text-xs text-gray-400 text-center mt-1">
        Powered by Gemini AI
      </p>
    </div>
  );
};

export default AIInsights;
