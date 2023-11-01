import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FC } from "react";
import Select from "react-select";
import { Input } from "@/components/formPrimitives/input";
import classNames from "classnames";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required").oneOf(["admin", "developer", "owner"]),
});

type Values = Yup.InferType<typeof validationSchema>;

interface AddTeamMemberDialogProps {
  backButton?: React.ReactNode;
  handleCreateTeamMember: (payload: Values) => Promise<void>;
}

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'developer', label: 'Developer' },
  { value: 'owner', label: 'Owner' },
];

const AddTeamMemberForm: FC<AddTeamMemberDialogProps> = ({ backButton, handleCreateTeamMember }) => {
  const initialValues = {
    name: "",
    email: "",
    role: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const toastOptions = { id: "create-tem-member" };
        try {
          toast.loading("Adding team member", toastOptions);
          await handleCreateTeamMember(values);
          toast.success("Team member added", toastOptions);
        } catch (error) {
          toast.error("Error adding team member", toastOptions);
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isValid, isSubmitting, setFieldValue }) => (
        <Form className=" space-y-4 max-w-[430px] w-full">
          <Input
            className="text-t-black text-sm"
            placeholder="Johnny Jones"
            label="Name"
            type="text"
            name="name"
            id="name"
          />
          <Input
            className="text-t-black text-sm"
            placeholder="johnny@gmail.com"
            label="Email"
            type="text"
            name="email"
            id="email"
          />

          <div>
            <label
              htmlFor="role"
              className="block text-sm mb-4 text-t-black"
            >
              Role(select role)
            </label>
            <Select
              styles={{
                control(base) {
                  return {
                    ...base,
                    backgroundColor: "#FAFAFA",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "none",
                    color: "#1A1A1A",
                  };
                },
              }}
              placeholder="Select role"
              options={roleOptions}
              onChange={(roleOption) => {
                if (!roleOption) return null;
                setFieldValue("role", roleOption.value);
              }}
            />
            <ErrorMessage
              name="role"
              component="div"
              className="text-red-500"
            />
          </div>

          <div
            className={classNames({
              "grid grid-cols-2 gap-2.5": Boolean(backButton),
            })}
          >
            {backButton}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-t-purple text-white cursor-pointer text-[18px] py-[18px] px-x rounded w-full"
            >
              Add Team Member
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { AddTeamMemberForm };
