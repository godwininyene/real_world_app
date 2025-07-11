import { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import { 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp, 
  FiShare2,
  FiPieChart,
  FiCreditCard,
  FiBarChart2,
  FiHelpCircle
} from 'react-icons/fi';
import StatsCard from '../../components/common/StatsCard';
import RecentActivityTable from '../../components/common/RecentActivityTable';
import QuickActionCard from '../../components/common/QuickActionCard';
import StatusBadge from '../../components/common/StatusBadge';
import moment from 'moment';

export default function Dashboard() {
  const [data, setData] = useState({
    stats: null,
    transactions: [],
    investments: []
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get('api/v1/stats/admin');
      setData({
        stats: res.data.data.stats,
        transactions: res.data.data.latest_transactions,
        investments: res.data.data.latest_investments
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<FiUsers size={20} />}
          title="Total Users"
          value={data.stats?.users || 0}
          linkText="Manage Users"
          linkTo="/admin/users"
          color="blue"
        />
        
        <StatsCard
          icon={<FiDollarSign size={20} />}
          title="Total Balance"
          value={`$${(data.stats?.total_balance || 0).toLocaleString()}`}
          linkText="View Transactions"
          linkTo="/admin/transactions"
          color="green"
        />
        
        <StatsCard
          icon={<FiTrendingUp size={20} />}
          title="Total Profits"
          value={`$${(data.stats?.total_profit || 0).toLocaleString()}`}
          linkText="View Investments"
          linkTo="/admin/investments"
          color="purple"
        />
        
        <StatsCard
          icon={<FiShare2 size={20} />}
          title="Referral Balance"
          value={`$${(data.stats?.total_referral_balance || 0).toLocaleString()}`}
          // linkText="View Referrals"
          // linkTo="/"
          color="amber"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pending Transactions */}
        <div className="lg:col-span-2">
          <RecentActivityTable
            title="Pending Transactions"
            linkTo="/admin/transactions"
            linkText="View All"
            loading={loading}
            data={data.transactions?.filter(t => t.status === 'pending').slice(0, 5)}
            emptyText="No pending transactions"
            columns={[
              { 
                key: 'user', 
                title: 'User', 
                render: (t) => `${t.user?.firstName || ''} ${t.user?.lastName || ''}`.trim() || 'Unknown'
              },
              { key: 'type', title: 'Type', render: (t) => t.type?.toUpperCase() },
              { 
                key: 'amount', 
                title: 'Amount', 
                render: (t) => `$${Number(t.amount).toLocaleString()}`
              },
              { key: 'status', title: 'Status', render: (t) => <StatusBadge status={t.status} /> }
            ]}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionCard
              icon={<FiPieChart size={20} />}
              title="Manage Plans"
              linkTo="/admin/plans"
            />
            <QuickActionCard
              icon={<FiCreditCard size={20} />}
              title="Payment Options"
              linkTo="/admin/payment_options"
            />
            <QuickActionCard
              icon={<FiBarChart2 size={20} />}
              title="Investments"
              linkTo="/admin/investments"
            />
            <QuickActionCard
              icon={<FiHelpCircle size={20} />}
              title="Manage FAQ"
              linkTo="/admin/manage_faq"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivityTable
          title="Recent Transactions"
          linkTo="/admin/transactions"
          linkText="View All"
          loading={loading}
          data={data.transactions?.slice(0, 5)}
          emptyText="No recent transactions"
          columns={[
            { 
              key: 'user', 
              title: 'User', 
              render: (t) => `${t.user?.firstName || ''} ${t.user?.lastName || ''}`.trim() || 'Unknown'
            },
            { key: 'type', title: 'Type', render: (t) => t.type?.toUpperCase() },
            { 
              key: 'amount', 
              title: 'Amount', 
              render: (t) => `$${Number(t.amount).toLocaleString()}`
            },
            { 
              key: 'date', 
              title: 'Date', 
              render: (t) => moment(t.createdAt).format('MMM D, h:mm A')
            }
          ]}
        />

        <RecentActivityTable
          title="Recent Investments"
          linkTo="/admin/investments"
          linkText="View All"
          loading={loading}
          data={data.investments?.slice(0, 5)}
          emptyText="No recent investments"
          columns={[
            { 
              key: 'user', 
              title: 'User', 
              render: (i) => `${i.user?.firstName || ''} ${i.user?.lastName || ''}`.trim() || 'Unknown'
            },
            { key: 'plan', title: 'Plan', render: (i) => i.plan?.name || 'N/A' },
            { 
              key: 'amount', 
              title: 'Amount', 
              render: (i) => `$${Number(i.amount).toLocaleString()}`
            },
            { key: 'status', title: 'Status', render: (i) => <StatusBadge status={i.status} /> }
          ]}
        />
      </div>
    </div>
  );
}