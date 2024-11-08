import React, { useEffect, useState } from 'react'
import Page from '../dashboard/page'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '@/config/BaseUrl';
import MUIDataTable from 'mui-datatables';

const CloseSent = () => {
    const [closeSentData, SetCloseSentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchOpenData = async () => {
          try {
            setLoading(true);
            const token = localStorage.getItem("token")
            const response = await axios.get(
              `${BASE_URL}/api/panel-fetch-enquiry-sent/2`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
              
            );
    
            SetCloseSentData(response.data?.data);
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
            title="Close Sent"
            data={closeSentData ? closeSentData : []}
            columns={columns}
            options={options}
          />
        </div>
   </Page>
  )
}

export default CloseSent