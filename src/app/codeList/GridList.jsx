import { useEffect, useState } from "react";
import 'react-data-grid/lib/styles.css';
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import DataGrid from 'react-data-grid';
import Page from '../dashboard/page';
const GridList = () => {
    const [brandData, setBrandData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://houseofonzone.com/admin/public/api/fetch-brand-list`,
          {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmQyNGQyYzIwY2I3NDAzZmVjZjdmZTY4ZDEzNWIxNTE4ZTE5OTVhOTUwYmNjNTEzMTg0NGEwM2NhZTM5MjYyMDBiY2QwZWMxM2Y0OGRjMWMiLCJpYXQiOjE3Mjk2NjUxNzcuMDE3MTc4MDU4NjI0MjY3NTc4MTI1LCJuYmYiOjE3Mjk2NjUxNzcuMDE3MTgyMTExNzQwMTEyMzA0Njg3NSwiZXhwIjoxNzYxMjAxMTc3LjAwODQ2MjkwNTg4Mzc4OTA2MjUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.hLWh3nfZJXer1-a5FMs0q0kNd01DDpP8CUCHVn3RCkHPQj2NDa88_-6zXZSLMna6_TR2WMZJhoPLB1qHhImQtRnF1UZdeiEecMnagnu1Rg_q604uR93rSq0npimBckbBkOIehFcuY1UDMpCdpInChDHRYWLM7cMl0ERKq3_-wKybDdfkqjAgdI6CX-WzyFxa2R8ZkGtQVjz56x2iOcmAqrG-UOx5_e_Z6KGiluP6KtZh4XiZ6kmp5DVj9R5MkwPdMi_P-q6QCjRhzMB0mMBW5HGygltr38BG7Utr_b6JxCZ0gOro7LrtVv47zo2-BjgbLBUKZVimkGrsmmZTv7Yq8O5Lw-S0EhfqEi20jRlXR38i8RyU2vGPQOCG3yW1v2Atr-dEFlzKpVx2KqtooBc6e_tU1LLqsttoefFpBHGmnlIqUK9swopXnFwHR3eOUKao425N6pyzbr39nqKKc6h8MTxCh4K_fNrMLSStMyXjwMSrT9RCa1CmoHUxzK_shfdBjXTtw0wBq0MunPW_sCLO8iTjnrOyKSz5wUQM7-7w3OMJGcauPX3oMGafV4ZZ3lXLRUeKTv871Cop-LWVng69nPsy_gL8bffrIGAl4BZCC7fWFg-Wd1nkz-_FCiLUh268L1xoG1DxpbFBEzXZGB2fLE1m5LNyTDYyJHZ0R0F9Pg4`,
              },
          }
        );
        setBrandData(response.data?.brand || []);
      } catch (error) {
        console.error("Error fetching brand data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandData();
  }, []);

  const handleEditClick = (id) => {
    setSelectedBrand(id);
    setOpenEdit(true);
  };

  // Define columns for React Data Grid
  const columns = [
    {
      key: "slNo",
      name: "SL No",
      formatter: ({ rowIndex }) => rowIndex + 1,
    },
    {
      key: "fabric_brand_brands",
      name: "Brand",
    },
    {
      key: "fabric_brand_status",
      name: "Status",
    },
    {
      key: "id",
      name: "Action",
      formatter: ({ row }) => (
        <div className="flex gap-2">
          <Edit
            title="Edit"
            className="h-5 w-5 cursor-pointer hover:text-blue-500"
            onClick={() => handleEditClick(row.id)}
          />
          <Delete
            title="Delete"
            className="h-5 w-5 cursor-pointer hover:text-red-500"
          />
        </div>
      ),
    },
  ];
      

    return (
        <Page>
         <div className="bg-gray-100 p-4 border-2 border-dashed border-green-500 rounded-lg">
        <DataGrid
          columns={columns}
          rows={brandData}
          rowKeyGetter={(row) => row.id}
          className=" bg-black"
        />
      </div>

      {openEdit && selectedBrand && (
        <Sheet open={openEdit} onOpenChange={setOpenEdit}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Brand {selectedBrand}</SheetTitle>
              <SheetDescription>
                Here you can edit the details of the brand: {selectedBrand}.
              </SheetDescription>
              {/* Add form fields for editing */}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
        </Page>
    )
  
}

export default GridList