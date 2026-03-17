import * as Minio from 'minio';

let minioClient: Minio.Client | null = null;

export function getMinioClient(): Minio.Client {
  if (minioClient) {
    return minioClient;
  }

  const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
  const port = parseInt(process.env.MINIO_PORT || '9000', 10);
  const useSSL = process.env.MINIO_USE_SSL === 'true';
  const accessKey = process.env.MINIO_ACCESS_KEY || 'minioadmin';
  const secretKey = process.env.MINIO_SECRET_KEY || 'minioadmin';

  minioClient = new Minio.Client({
    endPoint: endpoint,
    port: port,
    useSSL: useSSL,
    accessKey: accessKey,
    secretKey: secretKey,
  });

  return minioClient;
}

export async function ensureBucketExists(bucketName: string): Promise<void> {
  const client = getMinioClient();
  const exists = await client.bucketExists(bucketName);
  
  if (!exists) {
    await client.makeBucket(bucketName, 'us-east-1');
    // Set bucket policy to allow public read access
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucketName}/*`],
        },
      ],
    };
    await client.setBucketPolicy(bucketName, JSON.stringify(policy));
  }
}

export async function uploadFile(
  bucketName: string,
  objectName: string,
  file: Buffer,
  contentType: string
): Promise<string> {
  const client = getMinioClient();
  await ensureBucketExists(bucketName);
  
  await client.putObject(bucketName, objectName, file, file.length, {
    'Content-Type': contentType,
  });

  const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
  const port = process.env.MINIO_PORT || '9000';
  const useSSL = process.env.MINIO_USE_SSL === 'true';
  const protocol = useSSL ? 'https' : 'http';
  
  return `${protocol}://${endpoint}:${port}/${bucketName}/${objectName}`;
}

export async function deleteFile(bucketName: string, objectName: string): Promise<void> {
  const client = getMinioClient();
  await client.removeObject(bucketName, objectName);
}

export async function getFileUrl(bucketName: string, objectName: string): Promise<string> {
  const client = getMinioClient();
  const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
  const port = process.env.MINIO_PORT || '9000';
  const useSSL = process.env.MINIO_USE_SSL === 'true';
  const protocol = useSSL ? 'https' : 'http';
  
  return `${protocol}://${endpoint}:${port}/${bucketName}/${objectName}`;
}

