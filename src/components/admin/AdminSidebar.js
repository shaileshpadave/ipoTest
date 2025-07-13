import React from 'react';
import { 
  ChartBarIcon, 
  CogIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  AdjustmentsHorizontalIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import BluestockLogo from '../common/BluestockLogo';

const AdminSidebar = ({ isOpen }) => {
  const menuItems = [
    {
      title: 'MENU',
      items: [
        { icon: ChartBarIcon, label: 'Dashboard', href: '/admin' },
        { icon: DocumentTextIcon, label: 'Manage IPO', href: '/admin/ipo', active: true },
        { icon: BellIcon, label: 'IPO Subscription', href: '/admin/subscription' },
        { icon: UserGroupIcon, label: 'IPO Allotment', href: '/admin/allotment' }
      ]
    },
    {
      title: 'OTHERS',
      items: [
        { icon: CogIcon, label: 'Settings', href: '/admin/settings' },
        { icon: AdjustmentsHorizontalIcon, label: 'API Manager', href: '/admin/api' },
        { icon: UserGroupIcon, label: 'Accounts', href: '/admin/accounts' },
        { icon: QuestionMarkCircleIcon, label: 'Help', href: '/admin/help' }
      ]
    }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <BluestockLogo 
          size="md" 
          showText={isOpen}
        />
        {isOpen && (
          <div className="mt-1">
            <span className="text-xs text-gray-500">Fintech</span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {isOpen && (
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                {section.title}
              </h3>
            )}
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {isOpen && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;