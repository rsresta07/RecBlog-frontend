import { useForm, FormProvider } from "react-hook-form";
import { TextInput, Button, Text, Anchor } from "@mantine/core";

/**
 * A common form component which takes in a list of fields and a validation
 * schema and renders a form with the provided fields and a submit button.
 *
 * @param {object[]} fields - A list of objects with the following properties:
 *   - label: The label for the field
 *   - name: The name of the field
 *   - type: The type of the field (default: text)
 *   - autoComplete: The autocomplete attribute for the field (default: off)
 *   - render: A function which returns a custom JSX for the field
 * @param {function} onSubmit - The function to call when the form is submitted
 * @param {object} validationSchema - The validation schema for the form
 * @param {string} buttonText - The text for the submit button (default: Submit)
 * @param {string} footerLinkText - The text to display before the link (default: "")
 * @param {string} footerLinkLabel - The label for the link (default: "")
 * @param {function} footerLinkAction - The function to call when the link is clicked (default: () => {})
 * @param {boolean} twoColumnLayout - Whether to layout the form in two columns (default: true)
 * @returns {JSX.Element} The form component
 */
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

  /**
   * Renders an input field based on the provided field configuration.
   * If a custom render function is provided in the field, it uses that
   * to render the input. Otherwise, it renders a standard TextInput
   * with validation error handling.
   *
   * @param {object} field - The configuration object for the form field.
   * @param {string} field.name - The name of the field, used as the key.
   * @param {string} field.label - The label for the field displayed above the input.
   * @param {string} [field.placeholder] - The placeholder text for the input.
   * @param {string} [field.type='text'] - The type of the input field.
   * @param {string} [field.autoComplete='off'] - The autocomplete attribute for the input.
   * @param {function} [field.render] - A custom render function for the field.
   * @returns {JSX.Element} A JSX element representing the input field.
   */
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
