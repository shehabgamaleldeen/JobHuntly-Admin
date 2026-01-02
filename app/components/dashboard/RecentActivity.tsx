import { FiUser, FiBriefcase, FiCheckCircle, FiXCircle } from "react-icons/fi";

// Define strict types for activity logs
interface ActivityLog {
  id: string;
  user: string;
  action: string;
  time: string;
  type: 'user' | 'job' | 'company' | 'application';
}

interface RecentActivityProps {
  activities?: ActivityLog[];
}

export default function RecentActivity({ activities = [] }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return <FiUser className="text-blue-500" />;
      case 'job': return <FiBriefcase className="text-amber-500" />;
      case 'company': return <FiBriefcase className="text-purple-500" />;
      case 'application': return <FiCheckCircle className="text-green-500" />;
      default: return <FiCheckCircle className="text-gray-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'user': return 'bg-blue-100';
      case 'job': return 'bg-amber-100';
      case 'company': return 'bg-purple-100';
      case 'application': return 'bg-green-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-96 overflow-y-auto">
       <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
      </div>
      
      <div className="space-y-6">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent activity found.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
               <div className={`p-2 rounded-full ${getBgColor(activity.type)}`}>
                  {getIcon(activity.type)}
               </div>
               <div>
                  <p className="text-sm font-semibold text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                   <p className="text-xs text-gray-400 mt-1">
                     {new Date(activity.time).toLocaleString()}
                   </p>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
