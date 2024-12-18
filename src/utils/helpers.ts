import AWS from "aws-sdk";
import useAuthStore from "@/store/auth";

export const formatDate = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const uploadToS3 = async (
  files: any,
  folderName: string,
): Promise<string | string[]> => {
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  const s3 = new AWS.S3();

  const uploadSingleFile = async (file: any): Promise<string> => {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: `${folderName}/${Date.now()}`,
      Body: file,
      ContentType: file.type || "image/jpeg",
      ACL: "public-read",
    };

    const result = await s3?.upload(params).promise();
    return result.Location;
  };

  if (Array.isArray(files)) {
    const uploadPromises = files.map((file) => uploadSingleFile(file.file));
    const results = await Promise.all(uploadPromises);
    return results;
  } else {
    return await uploadSingleFile(files);
  }
};

export const extractNumberFromUrl = (url: string): string | null => {
  const match = url.match(/\/(\d+)$/);
  return match ? match[1] : null;
};

export const deleteFromS3 = async (
  keys: string | string[],
  folderName: string,
): Promise<boolean> => {
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  const s3 = new AWS.S3();

  if (Array.isArray(keys)) {
    const objectsToDelete = keys.map((key) => {
      const extractedKey = extractNumberFromUrl(key);
      return { Key: `${folderName}/${extractedKey}` };
    });

    const params: AWS.S3.DeleteObjectsRequest = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Delete: {
        Objects: objectsToDelete,
        Quiet: false,
      },
    };

    const result = await s3.deleteObjects(params).promise();

    if (result.Errors && result.Errors.length > 0) {
      console.error("Error deleting files:", result.Errors);
      return false;
    }

    return true;
  } else {
    const extractedKey = extractNumberFromUrl(keys);

    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: `${folderName}/${extractedKey}`,
    };

    try {
      await s3.deleteObject(params).promise();
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }
};

export const getHeaders = () => {
  const userId = useAuthStore.getState().currentUser?._id;
  return {
    headers: {
      "Content-Type": "application/json",
      userId,
    },
  };
};
