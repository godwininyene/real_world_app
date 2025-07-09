import { FiUsers, FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';

const UserStatsCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    orange: 'bg-orange-500/10 text-orange-500',
    purple: 'bg-purple-500/10 text-purple-500'
  };

  return (
    <div className="bg-card rounded-xl p-5 border border-card-border">
      <div className={`p-3 rounded-lg ${colorClasses[color]} inline-block`}>
        {icon}
      </div>
      <div className="mt-4">
        <p className="text-sm text-text-light">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default UserStatsCard;