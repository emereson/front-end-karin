import { PiArrowBendUpRightBold } from "react-icons/pi";

interface Props {
  setSelectPlan: (plan: string) => void;
}

const Obrero = ({ setSelectPlan }: Props) => {
  return (
    <div className="w-full m-auto flex gap-14 items-center justify-center  ">
      <img
        className="w-[200px]"
        src={"/obrero.png"}
        alt="ALCANCE DEL SISTEMA DE GESTIÓN DE SST (4.3 / 4.4)"
        width={500}
        height={5000}
      />
      <div className="grid grid-cols-2 grid-rows-2  h-[50vh] max-h-[500px] w-[50vh] max-w-[500px]  bg-[#0d1341]  gap-2 p-2 rounded-xl">
        <section
          className="relative flex items-center justify-center bg-sky-500 text-white text-xl font-bold rounded-lg hover:bg-sky-600 transition-all duration-300 cursor-pointer"
          onClick={() => setSelectPlan("planificar")}
        >
          Planificar
          <PiArrowBendUpRightBold className="absolute top-[-80px] left-[-45px] text-[100px] text-[#161c96]  " />
        </section>
        <section
          className="relative flex items-center justify-center bg-green-500 text-white text-xl font-bold rounded-lg hover:bg-green-600 transition-all duration-300 cursor-pointer"
          onClick={() => setSelectPlan("hacer")}
        >
          Hacer
          <PiArrowBendUpRightBold className="absolute top-[-55px] right-[-80px] text-[100px] text-[#161c96]  rotate-90 " />
        </section>
        <section
          className="relative flex items-center justify-center bg-red-500 text-white text-xl font-bold rounded-lg hover:bg-red-600 transition-all duration-300 cursor-pointer"
          onClick={() => setSelectPlan("actuar")}
        >
          Actuar
          <PiArrowBendUpRightBold className="absolute bottom-[-55px] left-[-80px] text-[100px] text-[#161c96]  -rotate-90 " />
        </section>
        <section
          className="relative flex items-center justify-center bg-orange-400 text-white text-xl font-bold rounded-lg hover:bg-orange-500 transition-all duration-300 cursor-pointer"
          onClick={() => setSelectPlan("verificar")}
        >
          Verificar
          <PiArrowBendUpRightBold className="absolute bottom-[-80px] right-[-55px] text-[100px] text-[#161c96]  rotate-180 " />
        </section>
      </div>
    </div>
  );
};

export default Obrero;
