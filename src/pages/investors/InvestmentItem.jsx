import { HiPresentationChartBar } from 'react-icons/hi';
import moment from 'moment/moment';
const InvestmentItem = ({ investment }) => {
  const progress = Math.min(100, (investment.currentLevel / investment.totalDuration) * 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-bg-dark rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-400">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2.5 rounded-lg">
              <HiPresentationChartBar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{investment.plan?.name || 'Investment Plan'}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {moment(investment.investment?.createdAt).format('MMM D, YYYY')} - {moment(investment.investment?.expiryDate).format('MMM D, YYYY')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Invested</p>
              <p className="font-medium">${investment.investment.amount?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Profit</p>
              <p className="font-medium text-green-600 dark:text-green-400">
                ${investment.investment.profit?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative w-20 h-20">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className="text-indigo-600"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentItem