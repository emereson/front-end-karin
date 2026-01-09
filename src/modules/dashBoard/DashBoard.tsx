import Obrero from "./components/Obrero";
import { useState } from "react";
import AlcanceSistema from "./components/AlcanceSistema";
import { Button } from "@heroui/react";
import { FaArrowLeftLong } from "react-icons/fa6";

const DashBoard = () => {
  const [selectPlan, setSelectPlan] = useState<string | null>(null);

  return (
    <main className="w-full h-screen overflow-hidden overflow-y-auto p-10 bg-white  flex flex-col justify-start items-end gap-4">
      {selectPlan && (
        <Button
          className="min-h-10 min-w-10"
          color="primary"
          startContent={<FaArrowLeftLong className="text-xl" />}
          onPress={() => setSelectPlan(null)}
        >
          ATRAS
        </Button>
      )}
      {!selectPlan ? (
        <Obrero setSelectPlan={setSelectPlan} />
      ) : (
        <AlcanceSistema selectPlan={selectPlan} />
      )}
    </main>
  );
};

export default DashBoard;
