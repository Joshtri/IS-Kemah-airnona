import React from "react";  
import { GitHubBanner, Refine } from "@refinedev/core";  
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";  
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";  
import {  
  ErrorComponent,  
  RefineSnackbarProvider,  
  ThemedLayoutV2,  
  useNotificationProvider,  
} from "@refinedev/mui";  
import CssBaseline from "@mui/material/CssBaseline";  
import GlobalStyles from "@mui/material/GlobalStyles";  
import routerBindings, {  
  DocumentTitleHandler,  
  NavigateToResource,  
  UnsavedChangesNotifier,  
} from "@refinedev/react-router";  
import dataProvider from "@refinedev/simple-rest";  
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";  
import { Header } from "./components/header";  
import { ColorModeContextProvider } from "./contexts/color-mode";  
import { JemaatProvider } from "./providers/jemaat-data-provider"; // Import your JemaatProvider  
import { JemaatCreate, JemaatEdit, JemaatList, JemaatShow } from "./pages/jemaats";  
import { KartuKeluargaCreate, KartuKeluargaEdit, KartuKeluargaList, KartuKeluargaShow } from "./pages/kartu-keluargas";  

import { authProvider } from "./providers/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider  
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { LoginPage } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";
import { Title } from "./components/title";

import "@fontsource/poppins/400.css"; // Regular weight
import "@fontsource/poppins/600.css"; // Semi-bold weight
import { Dashboard, EmojiPeople, FamilyRestroom, Map } from "@mui/icons-material";
import { RayonCreate, RayonEdit, RayonList, RayonShow } from "./pages/rayons";


const queryClient = new QueryClient(); // Create a QueryClient instance  
  
function App() {  
  return (  
    <BrowserRouter>  
      <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}  
        <RefineKbarProvider>  
          <ColorModeContextProvider>  
            <JemaatProvider>  
              <CssBaseline />  
              <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />  
              <RefineSnackbarProvider>  
                <DevtoolsProvider>  
                  <Refine
                    authProvider={authProvider}
                    dataProvider={dataProvider(`${import.meta.env.VITE_BASE_URL}/api`)}  
                    notificationProvider={useNotificationProvider}  
                    routerProvider={routerBindings}  
                    LoginPage={LoginPage} // Ini akan menampilkan halaman login saat user belum terautentikasi
                    resources={[
                      {
                        name: "dashboard",
                        list: "/dashboard",
                        meta: {
                          label: "Dashboard",
                          icon: <Dashboard />,
                        },
                      },
                      {  
                        name: "jemaat",  
                        list: "/jemaat",  
                        create: "/jemaat/create",  
                        edit: "/jemaat/edit/:id",  
                        show: "/jemaat/show/:id",
                        meta: {
                          label: "Jemaat",
                          icon: <EmojiPeople/>
                        },
                        canDelete: true,


                      },  
                      {  
                        name: "kartu-keluarga",  
                        list: "/kartu-keluarga",  
                        create: "/kartu-keluarga/create",  
                        edit: "/kartu-keluarga/edit/:id",  
                        show: "/kartu-keluarga/show/:id",  
                        meta: {
                          label: "Kartu Keluarga",
                          icon: <FamilyRestroom/>
                        },
                        canDelete: true,
                      },  
                      {  
                        name: "rayon",  
                        list: "/rayon",  
                        create: "/rayon/create",  
                        edit: "/rayon/edit/:id",  
                        show: "/rayon/show/:id",
                        meta: {
                          label: "Rayon",
                          icon: <Map/>
                        },
                        canDelete: true,

                      }  
                    ]}  
                    options={{  
                      syncWithLocation: true,  
                      warnWhenUnsavedChanges: true,  
                      useNewQueryKeys: true,  
                      projectId: "sxqIfL-WcNGSc-e6m1Sh",  
                    }}  
                  >  
                    <Routes>
                      {/* Tambahkan route untuk login */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route  
                        element={  
                          <ThemedLayoutV2 Header={() => <Header sticky /> } Title={Title}>  
                            <Outlet />  
                          </ThemedLayoutV2>  
                        }>  
                        <Route  
                          index  
                          element={<NavigateToResource resource="jemaat" />}  
                        />

                        <Route path='/dashboard' element={<DashboardPage />} />

                        <Route path="/jemaat">  
                          <Route index element={<JemaatList />} />  
                          <Route path="create" element={<JemaatCreate />} />  
                          <Route path="edit/:id" element={<JemaatEdit />} />  
                          <Route path="show/:id" element={<JemaatShow />} />  
                        </Route>  
  
                        <Route path="/kartu-keluarga">  
                          <Route index element={<KartuKeluargaList />} />  
                          <Route path="create" element={<KartuKeluargaCreate />} />  
                          <Route path="edit/:id" element={<KartuKeluargaEdit />} />  
                          <Route path="show/:id" element={<KartuKeluargaShow />} />  
                        </Route>

                        <Route path="/rayon">
                          <Route index element={<RayonList />} />
                          <Route path='create' element={<RayonCreate/>} />
                          <Route path='edit/:id' element={<RayonEdit/>} />
                          <Route path='show/:id' element={<RayonShow/>} />
                        </Route>
  
                        <Route path="*" element={<ErrorComponent />} />  
                      </Route>  
                    </Routes>  
  
                    <RefineKbar />  
                    <UnsavedChangesNotifier />  
                    <DocumentTitleHandler />  
                  </Refine>  
                  <DevtoolsPanel />  
                </DevtoolsProvider>  
              </RefineSnackbarProvider>  
            </JemaatProvider>  
          </ColorModeContextProvider>  
        </RefineKbarProvider>  
      </QueryClientProvider> {/* Close QueryClientProvider */}  
    </BrowserRouter>  
  );  
}  
  
export default App;  
