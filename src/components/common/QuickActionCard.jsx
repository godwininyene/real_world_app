import { Link } from 'react-router-dom';

const QuickActionCard = ({ icon, title, linkTo }) => {
  return (
    <Link 
      to={linkTo} 
      className="p-4 rounded-lg bg-card border border-card-border hover:border-primary/30 hover:bg-bg-dark transition-colors text-center"
    >
      <div className="mx-auto text-xl mb-2 text-primary">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
};

export default QuickActionCard;