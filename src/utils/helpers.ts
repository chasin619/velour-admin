import AWS from "aws-sdk";

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
