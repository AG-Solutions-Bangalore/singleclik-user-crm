import Login from "./app/auth/Login";
import BrandEdit from "./app/brandList/BrandEdit"
import BrandList from "./app/brandList/BrandList"
import { Route, Routes } from "react-router-dom";
import CodeList from "./app/codeList/CodeList";
import GridList from "./app/codeList/GridList";
import OpenReceived from "./app/received/OpenReceived";
import CloseReceived from "./app/received/CloseReceived";
import OpenSent from "./app/sent/OpenSent";
import CloseSent from "./app/sent/CloseSent";
import Page from "./app/dashboard/page";
import CreateEnquiry from "./app/createEnquiry/CreateEnquiry";
import { Toaster } from "./components/ui/toaster";
import LoginAuth from "./components/loginAuth/LoginAuth";
// import Page from "./app/dashboard/page"

function App() {

  return (
 <>
      <Toaster />
<Routes>

  
  <Route path="/open-received" element={<OpenReceived />} />
  <Route path="/close-received" element={<CloseReceived />} />
  <Route path="/open-sent" element={<OpenSent />} />
  <Route path="/close-sent" element={<CloseSent />} />
  {/* <Route path="/create-enquiry" element={<CreateEnquiry />} /> */}
  <Route path="/code" element={<CodeList />} />

  {/* <Route path="/open-enquiry" element={<CodeList />} />
  <Route path="/close-enquiry" element={<BrandList />} /> */}
  <Route path="/" element={<Login />} />
  {/* <Route path="/login" element={<LoginAuth />} /> */}
  {/* <Route path="/brand-edit/:id" element={<BrandEdit />} /> */}
 

</Routes>


</>
  )
}

export default App
