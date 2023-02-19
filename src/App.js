import { ColorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider
 } from "@mui/material";
import { Routes, Route } from "react-router-dom";
 import Dashboard from "./scenes/dashboard/index"
//  import Team from "./scenes/team"
//  import Invoice from "./scenes/invoices"
//  import Contact from "./scenes/contacts"
//  import Bar from "./scenes/bar"
//  import Form from "./scenes/form"
//  import Pie from "./scenes/pie"
//  import Faq from "./scenes/faq"
import { useState } from "react";
//  import Geography from "./scenes/geography"
 import Topbar from './scenes/global/Topbar'
 import Sidenavbar from './scenes/global/Sidenavbar'
//  import Calender from './scenes/calender'
function App() {
  const [theme,colorMode]=useMode();
    const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
<ThemeProvider theme={theme}>
  <CssBaseline />
<div className="app">
<Sidenavbar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/team" element={<Team />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/geography" element={<Geography />} />
        <Route path="/form" element={<Form />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/calender" element={<Calender />} /> */}
      </Routes>
    </main>
    </div>
</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
