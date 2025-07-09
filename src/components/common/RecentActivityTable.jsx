import moment from 'moment';
import StatusBadge from './StatusBadge';
import LoadingIndicator from './LoadingIndicator';
import { Link } from 'react-router-dom';

const RecentActivityTable = ({ 
  title, 
  linkTo, 
  linkText, 
  columns, 
  data, 
  loading, 
  emptyText 
}) => {
  return (
    <div className="bg-card rounded-xl border border-card-border overflow-hidden">
      <div className="p-4 border-b border-card-border flex justify-between items-center">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Link 
          to={linkTo} 
          className="text-sm text-primary hover:underline"
        >
          {linkText}
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center">
            <LoadingIndicator type="dots" size={8} />
          </div>
        ) : (
          <table className="min-w-full divide-y divide-card-border">
            <thead className="bg-bg-dark">
              <tr>
                {columns.map((col) => (
                  <th 
                    key={col.key} 
                    className="px-4 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider"
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {data?.length ? (
                data.map((item, index) => (
                  <tr key={index} className="hover:bg-bg-dark transition-colors">
                    {columns.map((col) => (
                      <td 
                        key={col.key} 
                        className="px-4 py-3 whitespace-nowrap text-sm"
                      >
                        {col.render ? col.render(item) : item[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="p-4 text-center text-text-light">
                    {emptyText}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentActivityTable;