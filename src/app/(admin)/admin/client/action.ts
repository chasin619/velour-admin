import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useClientStore from "@/store/client";
import { ClientSchema } from "./schema";
import useConfigStore from "@/store/config";

const useClient = () => {
  const { clients, getClients, addClient } = useClientStore();
  const { setLoading } = useConfigStore();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const form = useForm({
    resolver: yupResolver(ClientSchema),
    defaultValues: {
      fullName: "",
      email: "",
      portalName: "",
      password: "",
    },
  });

  useEffect(() => {
    getClients();
  }, []);

  const onSubmit = async (payload: any) => {
    try {
      setLoading(true);
      await addClient(payload);
      form.reset();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsVisible(false);

  const openModal = () => setIsVisible(true);

  const FEILDS = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "Type your Full Name here",
    },
    {
      label: "Portal Name",
      name: "portalName",
      type: "text",
      placeholder: "Type your Portal Name here",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Type your Email here",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Type your Password here",
    },
  ];

  return {
    isVisible,
    closeModal,
    openModal,
    clients,
    onSubmit,
    FEILDS,
    form,
  };
};

export default useClient;
