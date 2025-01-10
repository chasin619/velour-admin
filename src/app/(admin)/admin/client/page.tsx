"use client";

import React from "react";
import { Button } from "@/components/Button";
import { Table } from "@/components/Table";
import Modal from "@/components/Modal";
import { Input } from "@/components/Input";
import useClient from "./action";

const Client = () => {
  const { FEILDS, clients, isVisible, form, closeModal, openModal, onSubmit } =
    useClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col justify-center gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[32px] font-bold leading-[30px] text-dark dark:text-white">
          Clients
        </h2>
        <Button
          label="Add Client"
          customClasses="bg-primary text-white rounded-md p-4 py-3"
          onClick={openModal}
        />
      </div>
      <Table
        titles={["Full Name", "Portal Name", "Email", "Status"]}
        data={clients}
      />
      <Modal
        visible={isVisible}
        title="Add Client"
        onRequestClose={closeModal}
        ok={{ text: "Submit" }}
        onConfirm={handleSubmit(onSubmit)}
      >
        {FEILDS.map((field) => (
          <Input
            key={field.name}
            register={register(field.name as 'fullName' | 'email' | 'portalName' | 'password')}
            label={field.label}
            name={field.name}
            inputType={field.type}
            placeholder={field.placeholder}
            error={errors[field.name as keyof typeof errors]}
          />
        ))}
      </Modal>
    </div>
  );
};

export default Client;
