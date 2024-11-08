import React, { useEffect, useState } from "react";
import Page from "../dashboard/page";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "@/config/BaseUrl";
import { CircleX, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const OpenSent = () => {
  const [openSentData, SetOpenSentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const fetchOpenData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-enquiry-sent/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      SetOpenSentData(response.data?.data);
    } catch (error) {
      console.error("Error fetching brand data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOpenData();
  }, []);

  const handleClose = async (e, id) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/panel-update-enquiry/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Sent Enquiry Closed",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        fetchOpenData();
        SetOpenSentData((prevOpenRListData) =>
          prevOpenRListData.filter(
            (open) => open.id !== id && open.status === open.status
          )
        );
        navigate("/open-sent");
      }
    } catch (error) {
      console.error("Error updating enquiry", error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  const columns = [
    {
      name: "slNo",
      label: "SL No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },

    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "subcategory",
      label: "SubCategory",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "enq_text",
      label: "Eqnuiry",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (status) => (
          <span
            className={` rounded-lg p-[6px]  text-xs ${
              status === "Pending" ? "bg-green-400" : "bg-red-400"
            }`}
          >
            {status}
          </span>
        ),
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <div className="flex gap-2">
              <div className="flex items-center space-x-2">
                
                <AlertDialog>
                  <AlertDialogTrigger>
                    <CircleX className="h-5 w-5 cursor-pointer hover:text-red-500" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        closed your{" "}
                        <span className="text-red-600">Open Enquiry</span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={(e) => handleClose(e, id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
  };
  return (
    <Page>
      <div className="bg-[#e9e9ee] p-[2px]  rounded-lg">
        <MUIDataTable
          title="Open Sent"
          data={openSentData ? openSentData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Page>
  );
};

export default OpenSent;
