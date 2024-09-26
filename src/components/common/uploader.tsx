import { CldUploadWidget } from "next-cloudinary";

interface AvatarUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export function AvatarUploader({ onUploadSuccess }: AvatarUploaderProps) {
  return (
    <CldUploadWidget
      uploadPreset={"interviewer"}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result) => {
        if (typeof result.info === "object" && "secure_url" in result.info) {
          onUploadSuccess(result.info.secure_url);
        }
      }}
      options={{
        singleUploadAutoClose: true,
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="rounded-md transition-all bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Change Avatar
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
