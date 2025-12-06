import BackButton from "../../logicalComponents/BackButton";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-20 px-20">
      <div className="flex gap-10 items-center">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-medium">Terms & Conditions</h1>
      </div>

      <div className="mt-10">
        <article className="whitespace-pre-line text-gray-700  text-xl">
          <ReactMarkdown>
            By registering, accessing, or using this app, you confirm that you
            are at least 18 years old (or have parental/guardian consent if
            younger) and agree to be bound by these Terms and our Privacy
            Policy.
          </ReactMarkdown>
          <br></br>
          <p className="text-xl font-semibold">You agree to:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Use the app only for lawful purposes.</li>
            <li>
              Provide accurate and complete information during registration and
              booking.
            </li>
            <li> Not impersonate others or create fake accounts.</li>
            <br />
            <p className="text-xl font-semibold">You may not:</p>
            <li>Disrupt or interfere with the app’s functionality.</li>
            <li>Try to access data or systems not meant for you.</li>
            <li>Use the app to harass or abuse doctors or staff.</li>
            <li>
              Your data is handled in accordance with our [Privacy Policy].
            </li>
            <li>
              You are responsible for keeping your login credentials secure.
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}
