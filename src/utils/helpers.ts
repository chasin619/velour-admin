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

export const uploadToS3 = async (file: any, fileName: string) => {
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  const s3 = new AWS.S3();

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
    Key: `${fileName}/${Date.now()}`,
    Body: file,
    ContentType: "image/jpeg",
    ACL: "public-read",
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Error uploading file to S3");
  }
};
