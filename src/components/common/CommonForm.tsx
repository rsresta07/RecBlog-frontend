import React from "react";
import { useForm } from "react-hook-form";
import { TextInput, Button, Text, Anchor } from "@mantine/core";

const CommonForm = ({
  fields,
  onSubmit,
  validationSchema,
  buttonText = "Submit",
  footerLinkText = "",
  footerLinkLabel = "",
  footerLinkAction = () => {},
  twoColumnLayout = true,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: validationSchema,
    mode: "onSubmit",
    shouldUnregister: false, // ← keeps field values alive
  });

  const renderInput = (field: any) => (
    <TextInput
      {...register(field.name)}
      key={field.name} // key ties to name → no remount on re‑render
      label={field.label}
      placeholder={field.placeholder}
      type={field.type || "text"}
      autoComplete={field.autoComplete ?? "off"}
      withAsterisk
      error={
        typeof errors[field.name]?.message === "string" && (
          <Text color="red">{errors[field.name]?.message as string}</Text>
        )
      }
    />
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-4"
      autoComplete="off"
    >
      {twoColumnLayout && fields.length >= 2 ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            {fields.slice(0, 2).map(renderInput)}
          </div>
          <div className="space-y-4">{fields.slice(2).map(renderInput)}</div>
        </>
      ) : (
        <div className="space-y-4">{fields.map(renderInput)}</div>
      )}

      <Button type="submit" fullWidth color="grape">
        {buttonText}
      </Button>

      {footerLinkLabel && (
        <Text size="sm">
          {footerLinkText}{" "}
          <Anchor
            component="button"
            onClick={footerLinkAction}
            className="cursor-pointer"
          >
            <span className="text-purple-900">{footerLinkLabel}</span>
          </Anchor>
        </Text>
      )}
    </form>
  );
};

export default CommonForm;
