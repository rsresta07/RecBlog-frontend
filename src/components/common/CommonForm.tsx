import { useForm, FormProvider } from "react-hook-form";
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
  const methods = useForm({
    resolver: validationSchema,
    mode: "onSubmit",
    shouldUnregister: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const renderInput = (field: any) => {
    if (field.render) {
      return <div key={field.name}>{field.render()}</div>;
    }

    return (
      <TextInput
        {...register(field.name)}
        key={field.name}
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
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 p-4"
        autoComplete="off"
      >
        <div className="space-y-4">{fields.map(renderInput)}</div>

        <Button type="submit" fullWidth color="primary-color">
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
              <span className="text-secondary">{footerLinkLabel}</span>
            </Anchor>
          </Text>
        )}
      </form>
    </FormProvider>
  );
};

export default CommonForm;
