import React from "react";
import { useForm } from "react-hook-form";
import { TextInput, Button, Stack, Text, Checkbox } from "@mantine/core";
import { Anchor } from "@mantine/core"; // For the link

const CommonForm = ({
  fields,
  onSubmit,
  validationSchema,
  buttonText = "Submit", // Default button text
  showCheckbox = false, // Whether to show the checkbox
  footerLinkText = "", // Text before the link (e.g., "Have an account?")
  footerLinkLabel = "", // Link text (e.g., "Login")
  footerLinkAction = () => {}, // Action for the link
  twoColumnLayout = true, // Whether to use a two-column layout for the first two fields
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
      {/* Conditional layout: Two-column for the first two fields if twoColumnLayout is true */}
      {twoColumnLayout && fields.length >= 2 ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            {fields.slice(0, 2).map((field: any) => (
              <div key={field.name}>
                <TextInput
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                  {...register(field.name)}
                  error={errors[field.name]?.message?.toString() || undefined}
                  withAsterisk // Adds a red asterisk to indicate required field
                />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {fields.slice(2).map((field: any) => (
              <div key={field.name}>
                <TextInput
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                  {...register(field.name)}
                  error={errors[field.name]?.message?.toString() || undefined}
                  withAsterisk
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {fields.map((field: any) => (
            <div key={field.name}>
              <TextInput
                label={field.label}
                placeholder={field.placeholder}
                type={field.type || "text"}
                {...register(field.name)}
                error={errors[field.name]?.message?.toString() || undefined}
                withAsterisk
              />
            </div>
          ))}
        </div>
      )}

      {/* Conditionally render the checkbox */}
      {showCheckbox && (
        <Checkbox
          color="grape"
          label="I agree to sell my soul and privacy to this corporation"
          {...register("agreeToTerms")}
        />
      )}

      <div className="flex justify-between items-center">
        {/* Conditionally render the footer link */}
        {footerLinkText && footerLinkLabel && (
          <Text size="sm">
            {footerLinkText}{" "}
            <Anchor
              href="#"
              onClick={(e) => {
                e.preventDefault();
                footerLinkAction();
              }}
            >
              <span className="text-purple-900">{footerLinkLabel}</span>
            </Anchor>
          </Text>
        )}
        {/* Button with customizable text */}
        <Button type="submit" variant="filled" color="grape">
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default CommonForm;
