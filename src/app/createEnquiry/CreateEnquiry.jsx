import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import BASE_URL from '@/config/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Spinner from '@/components/spinner/Spinner';
import { ContextPanel } from '@/lib/ContextPanel';

const CreateEnquiry = ({setIsDialogOpen}) => {


  const [enquiry, setEnquiry] = useState({
    catg_id: "",
    category: "",
    type: "",
    enq_text: "",
    sub_category: "",
    sub_catg_id:"",
  });

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [type, setType] = useState('');
  const [enqText, setEnqText] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const {fetchOpenData} = useContext(ContextPanel)
  const navigate = useNavigate()
  const { toast } = useToast()

  const types = [
    { value: '0', label: 'Urgent' },
    { value: '1', label: 'General' },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchSubCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-sub-categories-by-value/${enquiry.catg_id || ""}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSubCategories(response.data.categoriessub);
      
    } catch (error) {
      console.error("Error fetching Sub Categories:", error);
    }
  }, [enquiry.catg_id]);

  useEffect(() => {
    if (enquiry.catg_id) {
      fetchSubCategories();
    }
  }, [enquiry.catg_id, fetchSubCategories]);

  const handleCategoryChange = (selectedCategory) => {
    const selectedCategoryId = categories.find(cat => cat.category === selectedCategory)?.id || "";
    setCategory(selectedCategory);
    setEnquiry(prev => ({ ...prev, catg_id: selectedCategoryId }));
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    const selectedSubCategoryId = subCategories.find(sub => sub.subcategory === selectedSubCategory)?.id || "";
    setSubCategory(selectedSubCategory);
    setEnquiry(prev => ({ ...prev, sub_catg_id: selectedSubCategoryId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    if (!category || !subCategory || !type || !enqText) {
      toast({
        title: "Fill all the Required Fields",
        description: "Please complete all fields before submitting.",
      });
      return;
    }
    const data = {
      category: enquiry.catg_id,
      sub_category: enquiry.sub_catg_id,
      type,
      enq_text: enqText,
    };
    setLoading(true);
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`${BASE_URL}/api/panel-create-enquiry`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data?.code == '200'){
        setEnquiry({
          catg_id: "",
          category: "",
          type: "",
          enq_text: "",
          sub_category: "",
          sub_catg_id:"",
        })
        fetchOpenData()
        toast({
          title: "Enquiry Created Succesfully",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
        navigate('/open-received')
        setIsDialogOpen(false)
      
      }

      console.log('Enquiry created:', response.data);
    } catch (error) {
      console.error('Error creating enquiry:', error);
    }finally {
      setLoading(false);
     
    }
  };

  const formVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };
  return (

    <motion.div 
      className="max-w-lg mx-auto p-6  " 
      variants={formVariants} 
      initial="initial" 
      animate="animate" 
      exit="exit"
    >
     {loading && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-90  flex justify-center items-center z-10">
          <Spinner />
        </div>
      )}
       <form onSubmit={handleSubmit}  className="space-y-4">
          <div>
            <label className="block text-black font-semibold mb-2">Category</label>
            {loading ? (
              <div className="text-gray-500">Loading categories...</div>
            ) : (
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full border rounded-md  duration-150">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.category}>
                      {cat.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <label className="block text-black font-semibold mb-2">Subcategory</label>
            {loading ? (
              <div className="text-gray-500">Loading Subcategories...</div>
            ) : (
              <Select onValueChange={handleSubCategoryChange}>
                <SelectTrigger className="w-full border rounded-md  duration-150">
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.subcategory}>
                      {sub.subcategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <label className="block text-black font-semibold mb-2">Type</label>
            <Select onValueChange={setType}>
              <SelectTrigger className="w-full border rounded-md  duration-150">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-black font-semibold mb-2">Enquiry Text</label>
            <Textarea
              value={enqText}
              onChange={(e) => setEnqText(e.target.value)}
              placeholder="Enter enquiry details..."
               className="w-full h-36 border rounded-md  duration-150"
              
            />
          </div>

          <Button type="submit"  className="w-full bg-black text-white hover:bg-gray-700 transition duration-200">
           Create
          </Button>
        </form>
       
        </motion.div>
  
  )
}

export default CreateEnquiry