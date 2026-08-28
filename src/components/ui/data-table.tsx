import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table";
import { Pagination } from "./pagination";
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  pageSize?: number;
  searchKey?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 5,
  searchKey,
  className,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [query, setQuery] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Filter
  const filteredData = React.useMemo(() => {
    if (!query) return data;
    return data.filter((item) => {
      if (searchKey) {
        return String(item[searchKey])
          .toLowerCase()
          .includes(query.toLowerCase());
      }
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [data, query, searchKey]);

  // Sort
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Table Search Bar */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Filter records..."
          className="w-full h-9 pl-9 pr-4 rounded-full border border-zinc-800 bg-[#16161a] text-xs font-semibold text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                className={cn(col.sortable && "cursor-pointer select-none")}
              >
                <div className="flex items-center gap-1.5">
                  <span>{col.header}</span>
                  {col.sortable && (
                    <span className="text-zinc-400">
                      {sortConfig?.key === col.key ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-white" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-white" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-6 text-zinc-500"
              >
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item, rowIdx) => (
              <TableRow key={rowIdx}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(item) : item[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-end pt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
