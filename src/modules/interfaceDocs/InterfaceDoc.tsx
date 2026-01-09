import { useParams } from "react-router-dom";
import FileUploaderFODA from "./uploader-foda/FileUploaderFODA";
import { useEffect, useState } from "react";
import type { InterfaceDocProp } from "../../type/interfaceDoc";
import axios from "axios";
import config from "../../utils/auth/getToken";

const InterfaceDoc = () => {
  const { id } = useParams();
  const [interfaceDoc, setInterfaceDoc] = useState<InterfaceDocProp | null>(
    null
  );

  const getInterfaceDoc = () => {
    const url = `${import.meta.env.VITE_URL_API}/interface-doc/${id}`;

    axios
      .get(url, config)
      .then((res) => setInterfaceDoc(res.data.interface_doc));
  };

  useEffect(() => {
    if (id) {
      getInterfaceDoc();
    }
  }, [id]);

  return (
    <main className="w-full h-screen p-2 overflow-y-auto bg-gray-50 border-y-4 border-blue-700">
      {id && interfaceDoc && (
        <FileUploaderFODA id={Number(id)} interfaceDoc={interfaceDoc} />
      )}
    </main>
  );
};

export default InterfaceDoc;
