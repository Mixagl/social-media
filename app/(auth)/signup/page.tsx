import SignUpForm from "@/components/SignUpForm";

export default function Page() {
  return (
    <div className="w-full h-[calc(100vh-49px)] flex flex-col items-center justify-center">
      <div className="w-full">
        <SignUpForm />
      </div>
    </div>
  );
}
