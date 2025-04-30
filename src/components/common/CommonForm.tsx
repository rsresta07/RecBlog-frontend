import React from "react";
import { useForm } from "react-hook-form";
import { TextInput, Button, Text } from "@mantine/core";
import { Anchor } from "@mantine/core";

const CommonForm = ({
  fields,
  onSubmit,
  validationSchema,
  buttonText = "Submit",
  showCheckbox = false,
  footerLinkText = "",
  footerLinkLabel = "",
  footerLink = "",
  footerLinkAction = () => {},
  twoColumnLayout = true,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: validationSchema,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4">
      {twoColumnLayout && fields.length >= 2 ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            {fields.slice(0, 2).map((field: any) => (
              <TextInput
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type || "text"}
                {...register(field.name)}
                error={errors[field.name]?.message?.toString() || undefined}
                withAsterisk
              />
            ))}
          </div>
          <div className="space-y-4">
            {fields.slice(2).map((field: any) => (
              <TextInput
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type || "text"}
                {...register(field.name)}
                error={errors[field.name]?.message?.toString() || undefined}
                withAsterisk
              />
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {fields.map((field: any) => (
            <TextInput
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type || "text"}
              {...register(field.name)}
              error={errors[field.name]?.message?.toString() || undefined}
              withAsterisk
            />
          ))}
        </div>
      )}
      <Button type="submit" fullWidth color="grape">
        {buttonText}
      </Button>
      {footerLinkLabel && (
        <Text size="sm">
          {footerLinkText}{" "}
          <Anchor
            href="#"
            onClick={(e) => {
              e.preventDefault();
              footerLinkAction();
            }}
            className="cursor-pointer "
          >
            <span className={`text-purple-900`}> {footerLinkLabel}</span>
          </Anchor>
        </Text>
      )}
    </form>
  );
};

export default CommonForm;
