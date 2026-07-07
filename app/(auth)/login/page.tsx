import LogInForm from "@/components/LogInForm";

export default function Page() {
  return (
    <div className="w-full h-[calc(100vh-49px)] flex flex-col items-center justify-center">
      <div className="w-full">
        <LogInForm />
      </div>
    </div>
  );
}
