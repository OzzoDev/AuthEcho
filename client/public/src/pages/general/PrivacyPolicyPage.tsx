import { NavLink } from "react-router";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col gap-y-[40px] w-[80%] max-w-[1000px] m-auto py-[100px]">
      <h2 className="mb-6 text-2xl text-sky-300 font-semibold pb-4">Privacy Policy</h2>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Information We Collect</h3>
      <ul className="list-disc pl-6">
        <li>
          <strong>Personal Information:</strong> We may collect personal information such as your
          name, email address, and contact details when you register for our services.
        </li>
        <li>
          <strong>Account Information:</strong> Data related to your account, including login
          credentials and user preferences, is collected to manage your experience.
        </li>
        <li>
          <strong>Usage Data:</strong> We gather information on how you interact with our SDK,
          including pages visited, features used, and time spent on the platform.
        </li>
        <li>
          <strong>Device Information:</strong> Information about your device, such as IP address,
          browser type, and operating system, may also be collected to enhance security and
          usability.
        </li>
      </ul>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">
        How We Use Your Information
      </h3>
      <ul className="list-disc pl-6">
        <li>To provide and maintain our services, ensuring a seamless user experience.</li>
        <li>To notify you about changes to our services or SDK updates.</li>
        <li>
          To allow you to participate in interactive features of our service when you choose to do
          so.
        </li>
        <li>To provide customer support and respond to inquiries and feedback.</li>
        <li>
          To monitor the usage of our services and improve our offerings based on user behavior and
          preferences.
        </li>
      </ul>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Data Security</h3>
      <ul className="list-disc pl-6">
        <li>
          We implement industry-standard security measures to protect your information from
          unauthorized access, alteration, and disclosure.
        </li>
        <li>Data is encrypted during transmission to ensure confidentiality and integrity.</li>
        <li>
          Access to your personal information is restricted to authorized personnel only, who are
          bound by confidentiality obligations.
        </li>
      </ul>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Sharing Your Information</h3>
      <ul className="list-disc pl-6">
        <li>We do not sell or rent your personal information to third parties.</li>
        <li>
          Your information may be shared with trusted partners who assist us in providing and
          improving our services, subject to confidentiality agreements.
        </li>
        <li>
          We may disclose your information if required by law or to protect our rights and the
          safety of others.
        </li>
      </ul>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Your Rights</h3>
      <ul className="list-disc pl-6">
        <li>
          You have the right to access, correct, or delete your personal information at any time.
        </li>
        <li>You can request to opt-out of marketing communications.</li>
        <li>
          You have the right to data portability, allowing you to obtain your data in a structured
          format.
        </li>
        <li>
          If you believe your privacy rights have been violated, you can lodge a complaint with the
          appropriate authority.
        </li>
      </ul>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">
        Changes to This Privacy Policy
      </h3>
      <p>
        We may update our Privacy Policy from time to time. Any changes will be communicated to you
        by posting the new Privacy Policy on this page. You are advised to review this Privacy
        Policy periodically for any changes. Changes to this Privacy Policy are effective when they
        are posted on this page.
      </p>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Contact Us</h3>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us&nbsp;
        <NavLink to="/contact" className="text-cyan-400 font-semibold underline">
          here.
        </NavLink>
      </p>
    </div>
  );
}
