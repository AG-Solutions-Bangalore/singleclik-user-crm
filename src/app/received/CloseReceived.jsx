import React, { useEffect, useState } from 'react'
import Page from '../dashboard/page'
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';
import { Edit } from 'lucide-react';
import axios from 'axios';
import BASE_URL from '@/config/BaseUrl';

const CloseReceived = () => {
    const [closeReceivedData, SetCloseReceivedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchOpenData = async () => {
          try {
            setLoading(true);
            const token = localStorage.getItem("token")
            const response = await axios.get(
              `${BASE_URL}/api/panel-fetch-enquiry-received/2`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
              
            );
    
            SetCloseReceivedData(response.data?.data);
          } catch (error) {
            console.error("Error fetching brand data", error);
          } finally {
            setLoading(false);
          }
        };
        fetchOpenData();
      }, []);

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
              <span className={` rounded-lg p-[6px]  text-xs ${status === 'Pending' ? "bg-green-400" : "bg-red-400"}`} >
                {status}
              </span>
            ),
          },
        },
        // {
        //   name: "id",
        //   label: "Action",
        //   options: {
        //     filter: false,
        //     sort: false,
        //     customBodyRender: (id) => { 
        //       return (
        //         <div className="flex gap-2">
        //           <div className="flex items-center space-x-2">
        //           <Edit
        //               title="Update"
        //               className="h-5 w-5 cursor-pointer hover:text-blue-500"
                    
        //             />
        //           </div>
    
                  
        //         </div>
        //       );
        //     },
        //   },
        // },
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
            title="Close Recieved"
            data={closeReceivedData ? closeReceivedData : []}
            columns={columns}
            options={options}
          />
        </div>
    </Page>
  )
}

export default CloseReceived