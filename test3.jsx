// 1. Added More Sample Data:
// Added a loop to generate more sample data
for (let i = 0; i < 45; i++) {
    data.push({
      id: `generated-${i}`,
      amount: Math.floor(Math.random() * 1000) + 100,
      status: ["success", "processing", "failed"][Math.floor(Math.random() * 3)],
      email: `user${i}@example.com`,
    })
  }

// 2.Added New Icon Imports: 

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons"

// 3.Added Select Component Imports: 

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
/*
// 4. Set Initial Pagination State:

initialState: {
    pagination: {
      pageSize: 10,
    },
  },


  Added Enhanced Pagination Controls:


Page size selector (5, 10, 20, 30, 40, 50 rows per page)
Current page indicator
Navigation buttons:

First page (double arrow left)
Previous page (single arrow left)
Next page (single arrow right)
Last page (double arrow right)


Disabled states for navigation buttons when appropriate

The pagination controls include:

A dropdown to select the number of rows per page
Current page number and total pages display
Navigation buttons with icons
Responsive design (some buttons hide on mobile)
Selected rows counter
Proper disabled states for navigation buttons

To use this table:

You can filter the emails using the search input
Toggle column visibility using the Columns dropdown
Sort columns by clicking the column headers
Select rows using checkboxes
Navigate through pages using the pagination controls
Adjust the number of rows shown per page
Use the actions menu for each row

Would you like me to explain any specific part of the pagination implementation in more detail?


*/




import { useEffect, useState } from "react";
import Page from "../dashboard/page";
import axios from "axios";
import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CodeList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://houseofonzone.com/admin/public/api/fetch-brand-list", {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with actual token or handle auth dynamically
          },
        });
        setData(response.data?.brand || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "fabric_brand_brands",
      header: "Brand",
      cell: ({ row }) => <div>{row.getValue("fabric_brand_brands")}</div>,
    },
    {
      accessorKey: "fabric_brand_status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("fabric_brand_status")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: [],
      columnFilters: [],
      columnVisibility: {},
      rowSelection: {},
    },
    initialState: {
      pagination: {
        pageSize: 2,
      },
    },
  });

  return (
    <Page>
      <div className="w-full">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter brands..."
                value={(table.getColumn("fabric_brand_brands")?.getFilterValue() ?? "")}
                onChange={(event) =>
                  table.getColumn("fabric_brand_brands")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </Page>
  );
};

export default CodeList;
