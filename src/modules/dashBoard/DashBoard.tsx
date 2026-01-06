import Obrero from "./components/Obrero";
import { useState } from "react";
import AlcanceSistema from "./components/AlcanceSistema";
import { Button } from "@heroui/react";
import { FaArrowLeftLong } from "react-icons/fa6";

const DashBoard = () => {
  const [selectPlan, setSelectPlan] = useState<string | null>(null);

  return (
    <main className="w-full min-h-[90vh]  overflow-hidden p-10 bg-white  flex flex-col items-end">
      {selectPlan && (
        <Button
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
