import { Link } from 'react-router-dom';

const StatsCard = ({ icon, title, value, linkText, linkTo, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    purple: 'bg-purple-500/10 text-purple-500',
    amber: 'bg-amber-500/10 text-amber-500'
  };

  return (
    <div className="bg-card rounded-xl p-5 border border-card-border">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        {linkTo && (
          <Link 
            to={linkTo} 
            className="text-xs font-medium text-primary hover:underline"
          >
            {linkText} →
          </Link>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-text-light">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;