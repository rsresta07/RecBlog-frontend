import { Button, Grid, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserInput, EditUserSchema } from "@/utils/schemas/EditUserSchema";
import { useEffect } from "react";

type EditUserFormProps = {
  initialValues: EditUserInput;
  onSubmit: (data: EditUserInput) => void;
};

const EditUserForm = ({ initialValues, onSubmit }: EditUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditUserInput>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: initialValues,
  });

  // update form if initialValues change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Full Name"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Username"
            {...register("username")}
            error={errors.username?.message}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Position"
            {...register("position")}
            error={errors.position?.message}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Role"
            {...register("role")}
            error={errors.role?.message}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button type="submit" fullWidth>
            Update
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default EditUserForm;
