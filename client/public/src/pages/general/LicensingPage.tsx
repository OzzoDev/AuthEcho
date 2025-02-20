export default function LicensingPage() {
  return (
    <div className="flex flex-col gap-y-[40px] w-[80%] max-w-[1000px] m-auto py-[100px]">
      <h2 className="mb-6 text-2xl text-sky-300 font-semibold pb-4">Licensing Information</h2>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Usage Rights</h3>
      <ul className="list-disc pl-6">
        <li>
          You are granted a non-exclusive, royalty-free license to use the Authecho SDK in your
          applications.
        </li>
        <li>You may modify the SDK to suit your specific development needs.</li>
        <li>
          You are allowed to distribute applications built with the Authecho SDK, provided that the
          SDK itself is not redistributed independently.
        </li>
        <li>The license is granted for both commercial and non-commercial use.</li>
      </ul>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Attribution Requirements</h3>
      <ul className="list-disc pl-6">
        <li>
          Proper attribution must be given in your application’s documentation or credits section.
        </li>
        <li>
          Attribution should include a statement indicating that your application uses the Authecho
          SDK.
        </li>
        <li>Links to Authecho’s website and documentation are appreciated but not mandatory.</li>
      </ul>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Prohibitions</h3>
      <ul className="list-disc pl-6">
        <li>
          You may not sell or redistribute the Authecho SDK on its own without prior written consent
          from Authecho.
        </li>
        <li>You may not use the SDK for any illegal or unauthorized purposes.</li>
        <li>
          Modifications to the SDK must not misrepresent the source or create confusion regarding
          the original SDK’s identity.
        </li>
      </ul>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Limitation of Liability</h3>
      <ul className="list-disc pl-6">
        <li>
          Authecho shall not be liable for any damages arising from the use of the SDK, including
          direct, indirect, incidental, or consequential damages.
        </li>
        <li>Users assume all risks associated with the use of the SDK and its capabilities.</li>
        <li>Authecho makes no warranties regarding the performance or reliability of the SDK.</li>
      </ul>

      <h3 className="mt-10 mb-6 text-xl text-cyan-400 font-semibold">Termination of License</h3>
      <p>
        The license will automatically terminate if you fail to comply with any of the terms
        outlined in this agreement. Upon termination, you must cease all use of the SDK and destroy
        any copies in your possession.
      </p>
    </div>
  );
}
