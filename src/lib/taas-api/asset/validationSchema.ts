import * as Yup from 'yup';

export const AssetDetailsSchema = Yup.object().shape({
    assetId: Yup.string().trim().required('Asset ID is required'),
    propertyDescription: Yup.string().trim().required('Property description is required'),
    propertyLocation: Yup.string().trim().required('Property location is required'),
    propertySize: Yup.number().positive('Invalid, property size must be a positive number').required('property size is required'),
    valuation: Yup.number().positive('Invalid, valuation must be a positive number').required('property size is required')
});


export const AssetTokenDetailsSchema = Yup.object().shape({
    assetId: Yup.string().trim().required('Asset ID is required'),
    propertyName: Yup.string().trim().required('Property name is required'),
    tokenTicker: Yup.string().trim().required('Token ticker is required'),
    pricePerToken: Yup.string().trim().required('Price Per token is required'),
});
