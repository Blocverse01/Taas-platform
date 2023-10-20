import { useRouter } from "next/router";

const ReloadPage = () => {
  const router = useRouter();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col">
        <p>An error occurred.</p>
        <button
          onClick={() => router.reload()}
          type="button"
          className="bg-t-purple text-white py-[18px] px-[57px] rounded"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export { ReloadPage };
