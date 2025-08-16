/// <reference types="node" />
import { v2 as cloudinary } from 'cloudinary'

if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

export interface UploadResult {
  public_id: string
  secure_url: string
  width?: number
  height?: number
  format: string
  resource_type: string
}

export class CloudinaryService {
  static async uploadImage(
    buffer: Buffer,
    folder: string = 'weda-lk',
    filename?: string
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const uploadOptions: any = {
        folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
      }

      if (filename) {
        uploadOptions.public_id = `${folder}/${filename}`
      }

      cloudinary.uploader
        .upload_stream(uploadOptions, (error, result) => {
          if (error) reject(error)
          else if (result) {
            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
              width: result.width,
              height: result.height,
              format: result.format,
              resource_type: result.resource_type,
            })
          } else {
            reject(new Error('Upload failed'))
          }
        })
        .end(buffer)
    })
  }

  static async uploadFromUrl(
    url: string,
    folder: string = 'weda-lk',
    filename?: string
  ): Promise<UploadResult> {
    const uploadOptions: any = {
      folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
    }

    if (filename) {
      uploadOptions.public_id = `${folder}/${filename}`
    }

    const result = await cloudinary.uploader.upload(url, uploadOptions)

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
    }
  }

  static async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId)
  }

  static async generateSignedUrl(publicId: string, transformation?: any): Promise<string> {
    const options: any = {}

    if (transformation) {
      options.transformation = transformation
    }

    return cloudinary.url(publicId, {
      ...options,
      secure: true,
      sign_url: true,
    })
  }

  static getOptimizedUrl(
    publicId: string,
    options: {
      width?: number
      height?: number
      quality?: string | number
      format?: string
    } = {}
  ): string {
    return cloudinary.url(publicId, {
      secure: true,
      quality: options.quality || 'auto',
      fetch_format: options.format || 'auto',
      width: options.width,
      height: options.height,
      crop: options.width || options.height ? 'fill' : undefined,
    })
  }
}

export default CloudinaryService
