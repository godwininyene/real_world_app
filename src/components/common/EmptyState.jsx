import PropTypes from 'prop-types';
import { FiInbox, FiAlertCircle, FiSearch, FiPlus } from 'react-icons/fi';

const EmptyState = ({ 
  title, 
  description, 
  iconType = 'default',
  action,
  className = '',
  image,
  imageAlt = 'Empty state illustration',
  fullHeight = false
}) => {
  // Icon options
  const icons = {
    default: <FiInbox className="h-6 w-6" />,
    error: <FiAlertCircle className="h-6 w-6" />,
    search: <FiSearch className="h-6 w-6" />,
    add: <FiPlus className="h-6 w-6" />
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${
      fullHeight ? 'min-h-[50vh]' : ''
    } ${className}`}>
      <div className="max-w-xs mx-auto">
        {/* Visual element - icon or image */}
        <div className="mx-auto mb-4">
          {image ? (
            <img 
              src={image} 
              alt={imageAlt} 
              className="mx-auto h-32 w-32 object-contain opacity-80"
            />
          ) : (
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
              {icons[iconType] || icons.default}
            </div>
          )}
        </div>
        
        {/* Text content */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-text-lighter">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-text-light">
              {description}
            </p>
          )}
        </div>
        
        {/* Action button */}
        {action && (
          <div className="mt-6">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  iconType: PropTypes.oneOf(['default', 'error', 'search', 'add']),
  action: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  fullHeight: PropTypes.bool
};

export default EmptyState;