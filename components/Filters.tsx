// Filters component for customer table

import { RiskLevel } from "@/types";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  riskLevelFilter: string;
  setRiskLevelFilter: (level: string) => void;
  showOnlyOverdue: boolean;
  setShowOnlyOverdue: (show: boolean) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

export default function Filters({
  searchQuery,
  setSearchQuery,
  riskLevelFilter,
  setRiskLevelFilter,
  showOnlyOverdue,
  setShowOnlyOverdue,
  sortOrder,
  setSortOrder,
}: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Customer
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Risk Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Risk Level
          </label>
          <select
            value={riskLevelFilter}
            onChange={(e) => setRiskLevelFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort by Risk Score
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </div>

        {/* Overdue Toggle */}
        <div className="flex items-end">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyOverdue}
              onChange={(e) => setShowOnlyOverdue(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Show only overdue
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
