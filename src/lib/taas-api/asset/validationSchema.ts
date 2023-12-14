import * as Yup from 'yup';

export const AssetDetailsSchema = Yup.object().shape({
    assetId: Yup.string().trim().required('Asset Id is required'),
    propertyDescription: Yup.string().trim().required('Property description is required'),
    propertyLocation: Yup.string().trim().required('Property location is required'),
    propertySize: Yup.number().positive('Invalid, property size must be a positive number').required('property size is required'),
    valuation: Yup.number().positive('Invalid, valuation must be a positive number').required('property size is required')
});


export const AssetTokenDetailsSchema = Yup.object().shape({
    assetId: Yup.string().trim().required('Asset Id is required'),
    propertyName: Yup.string().trim().required('Property name is required'),
    tokenTicker: Yup.string().trim().required('Token ticker is required'),
    pricePerToken: Yup.number().required('Price Per token is required'),
});


export const AssetPhotosSchema = Yup.object().shape({
    assetId: Yup.string().trim().required('Asset Id is required'),
    photos: Yup.array().required('Property photos is required').min(1, 'At least one photo is required')
});

export const AssetLableSchema = Yup.object().shape({
    documentId: Yup.string().trim().required('Document Id is required'),
    label: Yup.string().required('Document Lable is required')
});

export const AssetDocumentSchema = Yup.object().shape({
    fileURI: Yup.string().trim().url('Invalid url').required('File URL is required'),
    label: Yup.string().trim().required('label is required'),
    fileSize: Yup.number().required('File size is required'),
    fileType: Yup.string().trim().required('File Type is required'),
    assetId: Yup.string().trim().required('Asset Id is required'),
})

export const DeleteAssetDocumentSchema = Yup.object().shape({
    documentId: Yup.string().trim().required('Document Id is required'),
});
