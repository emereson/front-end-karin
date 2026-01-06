"use client";

import React from "react";
import { BsArrow90DegRight } from "react-icons/bs";

interface InfoBoxProps {
  title: string;
  code: string;
  color: string;
}

interface CycleElementProps {
  text: string;
  code: string;
  subtext?: string;
  subcode?: string;
  color: string;
  isCenter?: boolean;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, code, color }) => (
  <div
    className={`${color} border-2 border-black p-4 rounded-lg w-full text-center cursor-pointer shadow-md shadow-neutral-500`}
  >
    <p className="font-bold text-sm ">{title}</p>
    <p className="font-bold text-sm ">{code}</p>
  </div>
);

const CycleElement: React.FC<CycleElementProps> = ({
  text,
  code,
  subtext,
  subcode,
  color,
}) => (
  <div
    className={`${color} w-36 h-36 rounded-full flex flex-col justify-center items-center text-center p-2 shadow-lg border-4 border-black
      cursor-pointer 
      `}
  >
    <p className="font-extrabold text-xs  leading-tight">{text}</p>
    <p className="font-extrabold text-xs ">{code}</p>
    {subtext && (
      <>
        <div className="w-16 h-px bg-black my-1"></div>
        <p className="font-extrabold text-xs  leading-tight">{subtext}</p>
        <p className="font-extrabold text-xs ">{subcode}</p>
      </>
    )}
  </div>
);

interface Props {
  selectPlan: string;
}

// Componente principal de la página
export default function AlcanceSistema({ selectPlan }: Props) {
  return (
    <div className="w-full h-[560px] m-auto  flex items-center justify-center gap-4  ">
      <div className=" min-w-[300px]  h-full  flex flex-col justify-between gap-4">
        <article>
          <InfoBox
            title="T. ANÁLISIS DE ENTORNO "
            code="(4)"
            color={`${
              selectPlan === "planificar"
                ? "bg-cyan-500"
                : " cursor-no-drop bg-neutral-500"
            }`}
          />
        </article>
        <article>
          <InfoBox
            title="T.1 DIAGNÓSTICO DE LA ORGANIZACIÓN Y SU MEDIO"
            code="(4.1)"
            color={`${
              selectPlan === "planificar"
                ? "bg-cyan-500"
                : " cursor-no-drop bg-neutral-500"
            }`}
          />
        </article>
        <article>
          <InfoBox
            title="T.2 IDENTIFICACIÓN DE LAS NECESIDADES Y EXPECTATIVAS DE LOS TRABAJADORES Y PARTES INTERESADAS"
            code="(4.2)"
            color={`${
              selectPlan === "planificar"
                ? "bg-cyan-500"
                : " cursor-no-drop bg-neutral-500"
            }`}
          />
        </article>
      </div>

      <section
        className={`w-full h-full    p-4 rounded-2xl border-2 border-black flex flex-col items-center gap-4  shadow-md shadow-neutral-500
            ${
              selectPlan === "planificar"
                ? "bg-cyan-500"
                : " cursor-no-drop bg-neutral-500"
            }`}
      >
        <h2 className="text-center text-sm  font-bold">
          T.3 DELIMITACIÓN DEL ALCANCE DEL SGSST (4.3 / 4.4)
        </h2>

        <div className="relative flex items-center justify-center">
          <div
            className={`cursor-pointer  w-36 h-36 rounded-full overflow-hidden flex flex-col justify-center items-center text-center  shadow-lg border-4 border-black`}
          >
            <div
              className={`w-full h-full pt-3 bg-cyan-500 ${
                selectPlan === "planificar"
                  ? "bg-cyan-500"
                  : " cursor-no-drop bg-neutral-500"
              }`}
            >
              <p className="font-extrabold text-xs ">(7)</p>
              <p className="font-extrabold text-xs  leading-tight">
                W. SOPORTE
              </p>
            </div>

            <div
              className={`w-full h-full border-t-2 border-black pt-2 ${
                selectPlan === "hacer"
                  ? "bg-green-500"
                  : " cursor-no-drop bg-neutral-500"
              } `}
            >
              <p className="font-extrabold text-xs ">(8)</p>
              <p className="font-extrabold text-xs  leading-tight">
                X. EJECUCIÓN
              </p>
            </div>
          </div>
          <BsArrow90DegRight className="absolute bottom-[-20px] right-[-100px] text-[100px] text-[#161c96]  rotate-90" />
        </div>

        <div className="flex gap-4">
          <div className="relative flex items-center justify-center">
            <CycleElement
              text="V. PLANEAMIENTO"
              code="(6)"
              color={`${
                selectPlan === "planificar"
                  ? "bg-cyan-500"
                  : " cursor-no-drop bg-neutral-500"
              }`}
            />
            <BsArrow90DegRight className="absolute top-[-100px] right-[-20px] text-[100px] text-[#161c96] " />
          </div>
          <CycleElement
            text="U. DIRECCIÓN E INVOLUCRAMIENTO "
            code="(5)"
            color={`${
              selectPlan === "planificar"
                ? "bg-cyan-500"
                : " cursor-no-drop bg-neutral-500"
            }`}
          />

          <div className={`relative flex items-center justify-center  `}>
            <CycleElement
              text="Y. SEGUIMIENTO Y VALORACIÓN DEL DESEMPEÑO"
              code="(9)"
              color={`${
                selectPlan === "actuar"
                  ? "bg-orange-500"
                  : " cursor-no-drop bg-neutral-500 "
              }`}
            />
            <BsArrow90DegRight className="absolute bottom-[-100px] left-[-20px] text-[100px] text-[#161c96]  rotate-[-180deg]" />
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <CycleElement
            text="Z. OPTIMIZACIÓN"
            code="(10)"
            color={`${
              selectPlan === "verificar"
                ? "bg-red-500"
                : " cursor-no-drop bg-neutral-500"
            }`}
          />
          <BsArrow90DegRight className="absolute top-[-20px] left-[-100px] text-[100px] text-[#161c96]  rotate-[-90deg]" />
        </div>
      </section>
    </div>
  );
}
