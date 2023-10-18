import React, { FC } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { ErrorMessage, Form, Formik } from "formik";
import classNames from "classnames";
import toast from "react-hot-toast";

interface GenerateApiKeyProps {
  generateApiKey: (projectId: string) => Promise<string>;
  projects: Array<{
    id: string;
    name: string;
  }>;
  backButton?: React.ReactNode;
}

const generateApiKeySchema = Yup.object({
  project: Yup.string().required(),
});

type Values = Yup.InferType<typeof generateApiKeySchema>;

const GenerateApiKey: FC<GenerateApiKeyProps> = ({
  generateApiKey,
  projects,
  backButton,
}) => {
  const projectOptions = projects.map((project) => ({
    label: project.name,
    value: project.id,
  }));
  return (
    <Formik<Values>
      initialValues={{
        project: "",
      }}
      validationSchema={generateApiKeySchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const toastOptions = { id: "generate-api-key" };
        try {
          toast.loading("Generating API key", toastOptions);

          await generateApiKey(values.project);

          toast.success("API key generated successfully", toastOptions);
          resetForm();
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
          toast.error(errorMessage, toastOptions);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-10">
          <section>
            <Select
              styles={{
                control(base) {
                  return {
                    ...base,
                    backgroundColor: "#FAFAFA",
                    padding: "16px",
                    borderRadius: "4px",
                    border: "none",
                    color: "#1A1A1A",
                  };
                },
              }}
              placeholder="Select a project"
              options={projectOptions}
              onChange={(projectOption) => {
                if (!projectOption) return null;
                setFieldValue("project", projectOption.value);
              }}
            />
            <div className="text-red-500 mt-1">
              <ErrorMessage name="project" />
            </div>
          </section>
          <div
            className={classNames({
              "grid grid-cols-2 gap-2.5": Boolean(backButton),
            })}
          >
            {backButton}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-t-purple text-white py-[18px] px-[70px] rounded w-full"
            >
              Proceed
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { GenerateApiKey };
