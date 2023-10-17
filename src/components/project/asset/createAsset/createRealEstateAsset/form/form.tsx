import { CrossIcon, InfoCircleIcon } from "@/assets/icon";
import { DocumentUploaderDialog } from "@/components/documentUploader";
import { Input } from "@/components/formPrimitives/input";
import { Textarea } from "@/components/formPrimitives/textarea";
import { PhotoUploader } from "@/components/photoUploader";
import { removeArrayIndex } from "@/utils/arrays";
import { formatFileSize, uploadFile } from "@/utils/files";
import classNames from "classnames";
import { ErrorMessage, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import * as Yup from "yup";

// Todo: Replace with derived type
interface AssetDocument {
  label: string;
  fileURI: string;
  fileType: string;
  fileSize: number;
}

const formStepSchemas = {
  1: Yup.object({
    propertyName: Yup.string().required("Property name is required"),
    propertyLocation: Yup.string().required("Property location is required"),
    propertyDescription: Yup.string().required(
      "Property description is required"
    ),
    propertySize: Yup.number().required("Property size is required").min(1),
    pricePerToken: Yup.number().required().min(1),
    tokenTicker: Yup.string().required(),
  }),
  2: Yup.object({
    photos: Yup.array()
      .of(Yup.string().required())
      .required()
      .test({
        message: "Add at least one photo",
        test: (photos) => photos.length > 0,
      }),
    documents: Yup.array()
      .of(Yup.mixed<AssetDocument>().required())
      .required()
      .test({
        message: "Add at least one document",
        test: (documents) => documents.length > 0,
      }),
  }),
} as const;

type Values1 = Yup.InferType<(typeof formStepSchemas)[1]>;
type Values2 = Yup.InferType<(typeof formStepSchemas)[2]>;

interface CreateAssetFormProps {
  handleCreateAsset: (values: Values1 & Values2) => Promise<void>;
  backLink: string;
}

type FormStep = keyof typeof formStepSchemas;

const maxFileSize = 5 * 1024 * 1024; // approx 5MB

const CreateRealEstateAssetForm: FC<CreateAssetFormProps> = ({
  backLink,
  handleCreateAsset,
}) => {
  const [step, setStep] = useState<FormStep>(1);

  const defaultInitialValues = {
    1: {
      propertyName: "",
      propertyDescription: "",
      propertySize: 0,
      propertyLocation: "",
      pricePerToken: 0,
      tokenTicker: "",
    },
    2: {
      photos: [],
      documents: [],
    },
  };

  const [initialValues, setInitialValues] = useLocalStorage<{
    1: Values1;
    2: Values2;
  }>("createRealEstateAssetValues", defaultInitialValues);

  return (
    <section className="flex flex-col gap-10">
      <section>
        <div className="flex items-center w-fit mx-auto">
          <div className="flex flex-col items-center">
            <div
              className={classNames(
                {
                  "bg-t-purple text-white": step >= 1,
                },
                "h-8 w-8 flex items-center justify-center text-sm rounded-full mb-1"
              )}
            >
              1
            </div>
          </div>
          <div className="h-[1px] w-[172px] bg-t-purple" />
          <div className="flex flex-col items-center">
            <div
              className={classNames(
                {
                  "bg-t-purple text-white": step >= 2,
                  "text-t-purple border-t-purple border": step < 2,
                },
                "h-8 w-8 flex items-center justify-center text-sm rounded-full mb-1"
              )}
            >
              2
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-fit mx-auto gap-[88px]">
          <h3 className="text-center text-sm">Property Details</h3>
          <h3 className="text-center text-sm">Property Documents</h3>
        </div>
      </section>
      <>
        {step === 1 ? (
          <Formik<Values1>
            key={step} // relevant to prevent weird formik behavior
            initialValues={initialValues[step]}
            validationSchema={formStepSchemas[step]}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setInitialValues((prev) => ({
                ...prev,
                [step]: values,
              }));
              setSubmitting(false);
              resetForm();
              setStep(2);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-10 max-w-[430px] mx-auto">
                <section className="flex flex-col gap-8">
                  <Input
                    name="propertyName"
                    label="Property Name"
                    type="text"
                    id="propertyName"
                    placeholder="Name of Property"
                  />
                  <Input
                    name="propertyLocation"
                    label="Property Location"
                    type="text"
                    id="propertyLocation"
                    placeholder="Address of Property"
                  />
                  <div className="grid grid-cols-2 gap-[30px]">
                    <Input
                      name="propertySize"
                      label="Property Size (sq. metres)"
                      type="number"
                      id="propertySize"
                      placeholder="Property Size in sq. metres"
                    />
                    <Input
                      name="pricePerToken"
                      label="Price Per Token (USD)"
                      type="number"
                      id="pricePerToken"
                      placeholder="Token Price in USD"
                    />
                  </div>
                  <Input
                    label="Token Ticker (Please give your property an initial)"
                    name="tokenTicker"
                    customLabel={
                      <span>
                        Token Ticker{" "}
                        <span className="text-t-black/50">
                          (Please give your property an initial)
                        </span>
                      </span>
                    }
                    placeholder="A symbol for your token"
                  />
                  <Textarea
                    label="Property Description"
                    name="propertyDescription"
                    placeholder="Property Description"
                    rows={4}
                  />
                </section>
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href={backLink}
                    className="text-white py-[18px] px-[70px] rounded bg-t-black"
                  >
                    Back
                  </Link>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="py-[17px] bg-t-purple rounded text-white px-[87px] disabled:opacity-70"
                  >
                    Next
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : null}

        {step === 2 ? (
          <Formik<Values2>
            key={step} // relevant to prevent weird formik behavior
            initialValues={initialValues[step]}
            validationSchema={formStepSchemas[step]}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                await handleCreateAsset({ ...initialValues[1], ...values });
                resetForm();
                setInitialValues(defaultInitialValues);
                // Todo: add toast
              } catch (error) {
                // Todo: add toast
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="flex flex-col gap-10 max-w-[430px] mx-auto">
                <section className="flex flex-col gap-8">
                  <section>
                    <h3 className="text-t-black text-base mb-3">
                      Upload Media (Images)
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {values.photos &&
                        values.photos.map((photo, i) => (
                          <PhotoCard
                            key={i}
                            photoSrc={photo}
                            alt={`property photo ${i + 1}`}
                            removePhoto={() => {
                              const updatedPhotos = removeArrayIndex(
                                values.photos,
                                i
                              );
                              setFieldValue("photos", updatedPhotos);
                              setInitialValues((prev) => ({
                                ...prev,
                                [step]: {
                                  ...prev[step],
                                  photos: updatedPhotos,
                                },
                              }));
                            }}
                          />
                        ))}
                      <PhotoUploader
                        onUploadComplete={(fileUrl) => {
                          const updatedPhotos = [...values.photos, fileUrl];
                          setFieldValue("photos", updatedPhotos);
                          setInitialValues((prev) => ({
                            ...prev,
                            [step]: {
                              ...prev[step],
                              photos: updatedPhotos,
                            },
                          }));
                        }}
                        uploadPhoto={uploadFile}
                        maxSize={maxFileSize}
                      />
                    </div>
                    <div className="text-red-500 mt-1">
                      <ErrorMessage name="photos" />
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-0.5 mb-3">
                      <h3 className="text-t-black text-base flex items-center gap-1.5">
                        <span>Upload Documents</span>
                        <InfoCircleIcon />
                      </h3>
                      <span className="text-t-black/70 text-sm">
                        pdf, jpeg format only
                      </span>
                    </div>
                    <div className="flex flex-col gap-5">
                      {values.documents &&
                        values.documents.map((document, index) => (
                          <AssetDocumentCard
                            key={`${document.label}_${index}`}
                            document={document}
                            removeDocument={() => {
                              const updatedDocuments = removeArrayIndex(
                                values.documents,
                                index
                              );
                              setFieldValue("documents", updatedDocuments);
                              setInitialValues((prev) => ({
                                ...prev,
                                [step]: {
                                  ...prev[step],
                                  documents: updatedDocuments,
                                },
                              }));
                            }}
                          />
                        ))}
                      <DocumentUploaderDialog
                        uploadDocument={uploadFile}
                        onUploadComplete={(assetDocument) => {
                          const updatedDocuments = [
                            ...values.documents,
                            assetDocument,
                          ];
                          setFieldValue("documents", updatedDocuments);
                          setInitialValues((prev) => ({
                            ...prev,
                            [step]: {
                              ...prev[step],
                              documents: updatedDocuments,
                            },
                          }));
                        }}
                        maxSize={maxFileSize}
                      />
                    </div>
                    <div className="text-red-500 mt-1">
                      <ErrorMessage name="documents" />
                    </div>
                  </section>
                </section>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                    type="button"
                    className="text-white py-[18px] px-[70px] rounded bg-t-black"
                  >
                    Back
                  </button>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="py-[17px] bg-t-purple text-white px-[87px] rounded disabled:opacity-70"
                  >
                    Next
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : null}
      </>
    </section>
  );
};

interface PhotoCardProps {
  photoSrc: string;
  alt: string;
  removePhoto: () => void;
}
const PhotoCard: FC<PhotoCardProps> = ({ photoSrc, alt, removePhoto }) => {
  return (
    <div className="relative">
      <div className="relative min-w-[120px] w-full h-[80px]">
        <Image src={photoSrc} alt={alt} fill className="object-cover rounded" />
      </div>
      <button
        title="remove photo"
        onClick={removePhoto}
        type="button"
        className="absolute p-1.5 bg-white text-t-black rounded-full top-[1px] right-1 h-6 w-6 flex items-center justify-center"
      >
        <CrossIcon />
      </button>
    </div>
  );
};

interface AssetDocumentCardProps {
  document: AssetDocument;
  removeDocument: () => void;
}
const AssetDocumentCard: FC<AssetDocumentCardProps> = ({
  document,
  removeDocument,
}) => {
  const { label, fileSize, fileURI } = document;

  const fileName = fileURI.split("/")[fileURI.split("/").length - 1];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h3 className="text-t-gray-4 text-sm">{label}</h3>
      </div>
      <div className="bg-t-faded-purple rounded-lg py-[18px] px-4 flex items-center justify-between gap-3">
        <div className="w-[calc(100%-36px)]">
          <h4 className="text-t-black text-sm truncate">{fileName}</h4>
          <span className="text-t-gray-4 text-xs mt-[7px]">
            {formatFileSize(fileSize)}
          </span>
        </div>
        <button
          title="remove document"
          onClick={removeDocument}
          type="button"
          className="p-1.5 bg-white text-t-black rounded-full shrink-0 h-6 w-6 flex items-center justify-center"
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  );
};

export { CreateRealEstateAssetForm };
