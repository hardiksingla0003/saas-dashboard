import { ArrowDown, ArrowUp, ArrowUpDown, SearchX } from "lucide-react";
import React from "react";
const Table = ({
  columns,
  data,
  onEdit,
  onDelete,
  onSort,
  sortField,
  sortOrder,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow w-full overflow-x-auto">
      <table className="w-full text-left min-w-175">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`p-4 font-medium ${col.key === "actions" ? "cursor-default" : "cursor-pointer"}`}
                onClick={() => {
                  col.key !== "actions" && onSort && onSort(col.key);
                }}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {onSort &&
                    col.key !== "actions" &&
                    (sortField === col.key ? (
                      sortOrder === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )
                    ) : (
                      <ArrowUpDown size={14} />
                    ))}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-gray-500"
              >
                <div className="flex flex-col items-center gap-2">
                  <SearchX size={32} />
                  <span className="text-lg font-medium">No users found</span>
                  <span className="text-sm">
                    Try adjusting search or filters
                  </span>
                </div>
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-gray-200 dark:hover:bg-gray-700 transition "
            >
              {columns.map((col) => (
                <td key={col.key} className="p-4 whitespace-nowrap">
                  {col.key === "actions" ? (
                    (onEdit || onDelete) && (
                      <div className="flex gap-3">
                        {onEdit && (
                          <button
                            className="text-blue-600 hover:underline cursor-pointer"
                            onClick={() => onEdit(row)}
                          >
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button
                            className="text-red-600 hover:underline cursor-pointer"
                            onClick={() => onDelete(row)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )
                  ) : col.key === "status" ? (
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${row.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}`}
                    >
                      {row.status}
                    </span>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);
