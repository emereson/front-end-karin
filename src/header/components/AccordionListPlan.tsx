import { useState } from "react";
import {
  CheckCircle2,
  CalendarCheck,
  Hand,
  ChevronRight,
  Globe,
  Users,
  Network,
} from "lucide-react";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { TbPointFilled, TbWorld } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { VscServerProcess } from "react-icons/vsc";
import { AiFillInteraction } from "react-icons/ai";
import type { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

// --- TIPOS DE DATOS ---
interface ListItem {
  id: string;
  title: string;
  icono: IconType;
  bgColor?: "celeste" | "verde" | "naranja" | "rojo";
  link?: string;
  items?: ListItem[];
  title_principal?: boolean;
}

// --- DATOS DE LA LISTA (con iconos de Lucide) ---
const listData: ListItem[] = [
  {
    id: "",
    title: "PLAN",
    icono: FaCalendarAlt,
    bgColor: "celeste",
    title_principal: true,
    items: [
      {
        id: "T",
        title: "ANÁLISIS DEL ENTORNO",
        icono: TbWorld,
        items: [
          {
            id: "T.1",
            title: "DIAGNÓSTICO DE LA ORGANIZACIÓN Y SU MEDIO",
            icono: Globe,
            link: `/interface-doc/2`,
          },
          {
            id: "T.2",
            title:
              "IDENTIFICACIÓN DE LAS NECESIDADES Y EXPECTATIVAS DE LOS TRABAJADORES Y PARTES INTERESADAS",
            icono: Users,
            link: `/interface-doc/3`,
          },
          {
            id: "T.3",
            title: "DELIMITACIÓN DEL ALCANCE DEL SGSST",
            icono: Network,
            link: `/interface-doc/4`,
          },
          {
            id: "T.4",
            title: "SGSST",
            icono: CheckCircle2,
            link: `/interface-doc/5`,
          },
        ],
      },
      {
        id: "U",
        title: "DIRECCIÓN E INVOLUCRAMIENTO",
        icono: IoIosPeople,
        items: [
          {
            id: "U.1",
            title: "DIRECCIÓN E INVOLUCRAMIENTO",
            icono: IoIosPeople,
            link: `/interface-doc/6`,
          },
          {
            id: "U.2",
            title: "POLÍTICA DE LA SST ",
            icono: IoIosPeople,
            link: `/interface-doc/7`,
          },
          {
            id: "U.3",
            title: "MARCO DE GOBERNANZA EN LA ORGANIZACIÓN",
            icono: IoIosPeople,
            link: `/interface-doc/8`,
          },
          {
            id: "U.4",
            title: "DIÁLOGO Y COLABORACIÓN DE LOS TRABAJADORES ",
            icono: IoIosPeople,
            link: `/interface-doc/9`,
          },
        ],
      },
      {
        id: "V",
        title: "PLANEAMIENTO",
        icono: CalendarCheck,
        items: [
          {
            id: "V.1",
            title: "PLAN DE GETIÓN RIESGOS Y OPORTUNIDADES",
            icono: CalendarCheck,
            items: [
              {
                id: "V.1.1",
                icono: TbPointFilled,
                title: "ASPECTOS GENERALES",
                link: `/interface-doc/11`,
              },
              {
                id: "V.1.2",
                icono: TbPointFilled,
                title: "IPERC Y OPORTUNIDADES",
                link: `/interface-doc/10`,
              },
              {
                id: "V.1.3",
                icono: TbPointFilled,
                title: "LIMITACIÓN DE LOS REQUISITOS ",
                link: `/interface-doc/12`,
              },
              {
                id: "V.1.4",
                icono: TbPointFilled,
                title: "PLAN DE GESTIÓN",
                link: `/interface-doc/13`,
              },
            ],
          },
          {
            id: "V.2",
            title: "OBJETIVOS DE LA SST",
            icono: CalendarCheck,
            items: [
              {
                id: "V.2.1",
                icono: TbPointFilled,
                title: "OBJETIVOS DE LA SST",
                link: `/interface-doc/14`,
              },
              {
                id: "V.2.1",
                icono: TbPointFilled,
                title: "PLANIFICACIÓN DE OBJETIVOS DE SST",
                link: `/interface-doc/15`,
              },
            ],
          },
        ],
      },
      {
        id: "W",
        title: "SOPORTE",
        icono: Hand,
        items: [
          {
            id: "W.1",
            title: "ACTIVOS",
            icono: Hand,
            link: `/interface-doc/16`,
          },
          {
            id: "W.2",
            icono: TbPointFilled,
            title: "PERFIL DE COMPETENCIAS",
            items: [
              {
                id: "W.2.1",
                icono: TbPointFilled,
                title: "PERFIL DEL PUESTO",
                link: `/interface-doc/17`,
              },
              {
                id: "W.2.2",
                icono: TbPointFilled,
                title: "CAPACITACIÓN",
                link: `/interface-doc/18`,
              },
            ],
          },
          {
            id: "W.3",
            icono: TbPointFilled,
            title: "CONCIENTIZACIÓN",
            link: `/interface-doc/19`,
          },
          {
            id: "W.4",
            icono: TbPointFilled,
            title: "TRANSMISIÓN DE INFORMACIÓN",
            link: `/interface-doc/20`,
          },
          {
            id: "W.5",
            icono: TbPointFilled,
            title: "EVIDENCIA DOCUMENTAL",
            items: [
              {
                id: "W.5.1",
                icono: TbPointFilled,
                title: "GENERALIDADES",
                items: [
                  {
                    id: "",
                    icono: TbPointFilled,
                    title: "DOCUMENTACIÓN",
                    link: `/interface-doc/21`,
                  },
                  {
                    id: "",
                    icono: TbPointFilled,
                    title: "REGISTROS EN GENERAL",
                    link: `/interface-doc/22`,
                  },
                  {
                    id: "",
                    icono: TbPointFilled,
                    title: "PROCEDIMIENTOS",
                    link: `/interface-doc/23`,
                  },
                  {
                    id: "",
                    icono: TbPointFilled,
                    title: "FORMATOS",
                    link: `/interface-doc/24`,
                  },
                ],
              },
              {
                id: "W.5.2",
                icono: TbPointFilled,
                title: "CREACIÓN Y ACTUALIZACIÓN",
                link: `/interface-doc/25`,
              },
              {
                id: "W.5.3",
                icono: TbPointFilled,
                title: "CONTROL DE LA INFORMACIÓN DOCUMENTADA",
                link: `/interface-doc/26`,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "",
    title: "DO",
    icono: VscServerProcess,
    bgColor: "verde",
    title_principal: true,
    items: [
      {
        id: "X",
        title: "EJECUCIÓN",
        icono: VscServerProcess,
        items: [
          {
            id: "X.1",
            icono: TbPointFilled,
            title: "PROGRAMACIÓN Y SUPERVISIÓN OPERATIVA",
            items: [
              {
                id: "X.1.1",
                icono: TbPointFilled,
                title: "GENERALIDADES",
                link: `/interface-doc/27`,
              },
              {
                id: "X.1.2",
                icono: TbPointFilled,
                title: "ELIMINAR PELIGROS Y REDUCIR RIESGOS PARA LA SST-IPERC",
                link: `/interface-doc/28`,
              },
              {
                id: "X.1.3",
                icono: TbPointFilled,
                title: "GESTIÓN DEL CAMBIO",
                link: `/interface-doc/29`,
              },
              {
                id: "X.1.4",
                icono: TbPointFilled,
                title: "COMPRAS",
                link: `/interface-doc/30`,
              },
            ],
          },
          {
            id: "X.2",
            icono: TbPointFilled,
            title: "PLANIFICACION E INTERVENCION DE EMERGENCIAS",
            link: `/interface-doc/31`,
          },
        ],
      },
    ],
  },
  {
    id: "",
    title: "CHECK",
    icono: FaCheckCircle,
    bgColor: "naranja",
    title_principal: true,
    items: [
      {
        id: "Y",
        icono: TbPointFilled,
        title: "SEGUIMIENTO Y VALORACIÓN DEL DESEMPENO",
        items: [
          {
            id: "Y.1",
            icono: TbPointFilled,
            title: "MONITOREO,INDICADORES Y REVISIÓN DEL RENDIMIENTO ",
            items: [
              {
                id: "Y.1.1",
                icono: TbPointFilled,
                title: "GENERALIDADES",
                link: `/interface-doc/32`,
              },
              {
                id: "Y.1.2",
                icono: TbPointFilled,
                title: "EVALUACIÓN DEL CUMPLIMIENTO",
                link: `/interface-doc/33`,
              },
            ],
          },
          {
            id: "Y.2",
            icono: TbPointFilled,
            title: "AUDITORÍA INTERNA",
            link: `/interface-doc/34`,
          },
          {
            id: "Y.3",
            icono: TbPointFilled,
            title: "EVALUACIÓN POR LA DIRECCIÓN",
            link: `/interface-doc/35`,
          },
        ],
      },
    ],
  },
  {
    id: "",
    title: "ACT",
    icono: AiFillInteraction,
    bgColor: "rojo",
    title_principal: true,
    items: [
      {
        id: "Z",
        icono: TbPointFilled,
        title: "OPTIMIZACIÓN",
        items: [
          {
            id: "Z.1",
            icono: TbPointFilled,
            title: "ASPECTOS GENERALES",
            link: `/interface-doc/36`,
          },
          {
            id: "Z.2",
            icono: TbPointFilled,
            title: "INCIDENTE, NO CONFORMIDADES Y ACCIONES CORRECTIVAS",
            items: [
              {
                id: "Z.2.1",
                icono: TbPointFilled,
                title: "INCIDENTES, NO CONFORMIDADES  Y IPERC -PELIGROS NUEVOS",
                link: `/interface-doc/37`,
              },
              {
                id: "Z.2.2",
                icono: TbPointFilled,
                title: "CONTINGENCIAS PROFESIONALES",
                link: `/interface-doc/38`,
              },
            ],
          },
          {
            id: "Z.3",
            icono: TbPointFilled,
            title: "OPTIMIZACIÓN",
            link: `/interface-doc/39`,
          },
        ],
      },
    ],
  },
];

// --- PALETA DE COLORES CORPORATIVA ---
const colorMap = {
  celeste: {
    bg: "bg-sky-300",
    text: "text-neutral-900",
    hover: "hover:bg-sky-500",
    border: "border-sky-400",
    arrow: "text-sky-800",
  },
  verde: {
    bg: "bg-emerald-400",
    text: "text-neutral-900",
    hover: "hover:bg-emerald-500",
    border: "border-emerald-400",
    arrow: "text-emerald-800",
  },
  naranja: {
    bg: "bg-amber-400",
    text: "text-neutral-900",
    hover: "hover:bg-amber-500",
    border: "border-amber-400",
    arrow: "text-amber-800",
  },
  rojo: {
    bg: "bg-rose-400",
    text: "text-neutral-900",
    hover: "hover:bg-rose-500",
    border: "border-rose-400",
    arrow: "text-rose-800",
  },
  default: {
    bg: "bg-gray-300",
    text: "text-gray-900",
    hover: "hover:bg-gray-400",
    border: "border-gray-400",
    arrow: "text-gray-500",
  },
};

// --- COMPONENTE ACORDEÓN RECURSIVO MEJORADO ---
function AccordionItem({ item, level }: { item: ListItem; level: number }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const hasSubItems = item.items && item.items.length > 0;
  const colors = item.bgColor ? colorMap[item.bgColor] : colorMap.default;

  return (
    <div
      className={` rounded-sm overflow-hidden ${
        level === 0 ? `shadow-md ${colors.bg}` : ""
      }`}
    >
      <button
        onClick={() => {
          if (hasSubItems) {
            setOpen(!open);
          } else if (item.link) {
            navigate(`${item.link}`);
          }
        }}
        className={`w-full flex items-center justify-between p-1 text-left transition-colors duration-300 ${
          colors.text
        } ${level === 0 ? colors.hover : "hover:bg-slate-200"}`} // Un hover más genérico para hijos
        style={{ paddingLeft: `${level * 2 + 10}px` }}
      >
        <div
          className={`flex items-center gap-2  cursor-pointer ${
            item.title_principal ? "py-2" : "py-1"
          }`}
        >
          {item.icono && (
            <item.icono
              className={`${
                item.title_principal ? "w-5 h-5 " : "w-4 h-4 "
              }flex-shrink-0`}
            />
          )}
          <span
            className={`${
              item.title_principal
                ? "text-xs font-extrabold"
                : "text-[11px] font-semibold"
            } `}
          >
            {item.id && `${item.id}.`} {item.title}
          </span>
        </div>
        {hasSubItems && (
          <ChevronRight
            className={`w-4 h-4 transform transition-transform duration-300 ${
              open ? "rotate-90" : ""
            } ${colors.arrow}`}
          />
        )}
      </button>

      {hasSubItems && (
        // La magia está aquí: Usamos CSS Grid para la animación
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-in-out bg-white/30"
          style={{
            gridTemplateRows: open ? "1fr" : "0fr",
          }}
        >
          {/* Este div interior es crucial para que el contenido no se desborde
              mientras la animación del grid padre ocurre. */}
          <div className="overflow-hidden">
            <div className="py-1">
              {item.items!.map((subItem, index) => (
                <AccordionItem
                  key={index}
                  item={subItem}
                  level={level + 1}
                  // Ya no necesitamos pasar ningún callback de altura
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// --- COMPONENTE PRINCIPAL ---
export default function AccordionListPlan() {
  return (
    <div className="px-1 font-sans flex flex-col gap-1">
      {listData.map((item, index) => (
        <AccordionItem key={index} item={item} level={0} />
      ))}
    </div>
  );
}
