import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "@/config/BaseUrl";

export const ContextPanel = createContext();

const AppProvider = ({ children }) => {
    const [openReceivedData, SetOpenReceivedData] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchOpenData = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${BASE_URL}/api/panel-fetch-enquiry-received/1`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          SetOpenReceivedData(response.data?.data);
        } catch (error) {
          console.error("Error fetching brand data", error);
        } finally {
          setLoading(false);
        }
      };

  return (
    <ContextPanel.Provider value={{ openReceivedData, SetOpenReceivedData,fetchOpenData }}>
      {children}
    </ContextPanel.Provider>
  );
};

export default AppProvider;