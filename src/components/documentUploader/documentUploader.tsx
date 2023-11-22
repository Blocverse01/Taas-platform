import { CrossIcon, UploadCircleIcon } from '@/assets/icon';
import { Input } from '@/components/formPrimitives/input';
import { formatFileSize } from '@/utils/files';
import classNames from 'classnames';
import { ErrorMessage, Form, Formik } from 'formik';
import { FC, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { TAAS_PURPLE } from 'tailwind.config';
import * as Yup from 'yup';

interface DocumentUploaderProps {
  uploadDocument: (file: File) => Promise<string>;
  onUploadComplete: (assetDocument: UploadedAssetDocument) => void;
  maxSize: number;
  backButton?: React.ReactNode;
}

const DOCUMENT_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

const documentUploaderSchema = Yup.object().shape({
  label: Yup.string().required(),
  file: Yup.mixed<File>()
    .required()
    .test({
      test: (file) => file.size > 0,
      message: 'File cannot be empty',
    })
    .test({
      test: (file) => DOCUMENT_MIME_TYPES.includes(file.type),
      message: 'File should be an image or a pdf',
    }),
});

type InitialValues = typeof documentUploaderSchema.__outputType;

const DocumentUploader: FC<DocumentUploaderProps> = ({
  uploadDocument,
  onUploadComplete,
  backButton,
}) => {
  const initialValues: InitialValues = {
    label: '',
    file: new File([''], 'empty file'),
  };
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={documentUploaderSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const { file, label } = values;
        if (!file) return;

        try {
          setUploading(true);

          const fileURI = await uploadDocument(file);
          onUploadComplete({
            fileURI,
            fileType: file.type,
            label,
            fileSize: file.size,
          });

          resetForm();
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          // Todo: Add toast to show adding document succeeded
        } catch (error) {
          console.log(error);
          setUploadError('Upload failed');
        } finally {
          setUploading(false);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, isValid, values, setFieldTouched }) => (
        <Form className="space-y-6">
          <Input type="text" label="Document Label" name="label" placeholder="Enter a label" />

          <div>
            {values.file && values.file.size > 0 ? (
              <div className="bg-t-purple/20 rounded-lg py-3 px-4 flex items-center justify-between gap-3">
                <div className="w-[calc(100%-36px)]">
                  <h4 className="text-t-black text-sm truncate">{values.file.name}</h4>
                  <span className="text-t-gray-4 text-xs mt-[7px]">
                    {formatFileSize(values.file.size)}
                  </span>
                </div>
                <button
                  title="remove document"
                  onClick={() => {
                    setFieldValue('file', undefined);
                  }}
                  type="button"
                  className="p-1.5 bg-white text-t-black rounded-full shrink-0 h-6 w-6 flex items-center justify-center"
                >
                  <CrossIcon />
                </button>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="documentFile"
                  className="flex items-center justify-between py-5 px-4 bg-t-gray-7 text-t-black rounded"
                >
                  <span className="text-base">Choose File</span>
                  <UploadCircleIcon />
                  <input
                    ref={inputRef}
                    aria-label="upload photo"
                    className="sr-only"
                    id="documentFile"
                    type="file"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files) return;
                      setFieldTouched('file', true);
                      setFieldValue('file', files[0], true);
                    }}
                    accept="image/*,.pdf"
                  />
                </label>
                <div className="text-red-500 mt-1">
                  <ErrorMessage name="file" component="div" />
                </div>
              </div>
            )}

            {uploading && (
              <div className="flex items-center gap-2 mt-1.5">
                <ClipLoader size={40} color={TAAS_PURPLE} /> Uploading file
              </div>
            )}
            {uploadError && <div className="text-red-500 mt-1">{uploadError}</div>}
          </div>

          <div
            className={classNames(
              {
                'grid grid-cols-2 gap-2.5': Boolean(backButton),
              },
              'pt-[21px]'
            )}
          >
            {backButton}
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="px-6 py-3 text-base font-medium rounded disabled:opacity-40 bg-t-purple text-white"
            >
              {uploadError ? 'Retry Upload' : 'Proceed'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { DocumentUploader };
