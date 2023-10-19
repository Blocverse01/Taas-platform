import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Address, isAddress } from "viem";
import { FC, useEffect } from "react";
import { Input } from "@/components/formPrimitives/input";
import classNames from "classnames";

interface AddTeamMemberDialogProps {
  backButton?: React.ReactNode;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
});

const handleSubmit = (values: any) => {
  // Handle form submission here
  console.log("Form values:", values);
};

const AddTeamMemberForm: FC<AddTeamMemberDialogProps> = ({ backButton }) => {
  const initialValues = {
    name: "",
    email: "",
    role: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, isSubmitting }) => (
        <Form className=" space-y-4">
          <Input
            className="text-t-black"
            placeholder="Johnny Jones"
            label="Name"
            type="text"
            name="name"
            id="name"
          />
          <Input
            className="text-t-black"
            placeholder="johnny@gmail.com"
            label="Email"
            type="text"
            name="email"
            id="email"
          />

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role(select Role)
            </label>
            <Field
              as="select"
              id="role"
              name="role"
              className="block w-full p-2 border mt-4 rounded-md"
            >
              <option className="text-t-black" value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="owner">Owner</option>
            </Field>
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
              className="bg-t-purple text-white py-[18px] px-8 rounded w-full"
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
