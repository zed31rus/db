import z from "zod";

const FileSchemas = {
    avatar: z.instanceof(File)
        .refine((file) => file.size <= 20 * 1024 * 1024, 'Max size is 20MB')
        .refine((file) => file.type.startsWith('image/'), 'Only images are allowed')
}

export default FileSchemas;
export type FileSchemas = typeof FileSchemas;