import React, { createContext, useContext, ReactNode } from "react";  
import { useJemaat } from "../hooks/useJemaat";  
import { Jemaat, JemaatVariables, Pagination, Filters, Sorter } from "../hooks/useJemaat";  
  
interface JemaatContextType {  
  useGetList: (  
    pagination: Pagination,  
    filters: Filters,  
    sorters: Sorter[]  
  ) => {  
    data: { data: Jemaat[]; total: number } | undefined;  
    isLoading: boolean;  
    error: unknown;  
  };  
  useGetOne: (id: number) => {  
    data: Jemaat | undefined;  
    isLoading: boolean;  
    error: unknown;  
  };  
  createJemaat: (variables: JemaatVariables) => Promise<void>;  
  updateJemaat: (id: number, variables: JemaatVariables) => Promise<void>;  
  deleteJemaat: (id: number) => Promise<void>;  
}  
  
const JemaatContext = createContext<JemaatContextType | undefined>(undefined);  
  
interface JemaatProviderProps {  
  children: ReactNode;  
}  
  
export const JemaatProvider: React.FC<JemaatProviderProps> = ({ children }) => {  
  const {  
    useGetList,  
    useGetOne,  
    createJemaat: createJemaatMutation,  
    updateJemaat: updateJemaatMutation,  
    deleteJemaat: deleteJemaatMutation,  
  } = useJemaat();  
  
  const createJemaat = async (variables: JemaatVariables) => {  
    await createJemaatMutation.mutateAsync(variables);  
  };  
  
  const updateJemaat = async (id: number, variables: JemaatVariables) => {  
    await updateJemaatMutation.mutateAsync({ id, variables });  
  };  
  
  const deleteJemaat = async (id: number) => {  
    await deleteJemaatMutation.mutateAsync({ id });  
  };  
  
  return (  
    <JemaatContext.Provider  
      value={{  
        useGetList,  
        useGetOne,  
        createJemaat,  
        updateJemaat,  
        deleteJemaat,  
      }}  
    >  
      {children}  
    </JemaatContext.Provider>  
  );  
};  
  
export const useJemaatContext = (): JemaatContextType => {  
  const context = useContext(JemaatContext);  
  if (!context) {  
    throw new Error("useJemaatContext must be used within a JemaatProvider");  
  }  
  return context;  
};  
