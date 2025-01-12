export default function ServiceOverview() {
  return (
    <div className="service-overview">
      <h2 className="service-overview-main-header">The Echo Experience</h2>

      <h3 className="service-overview-sub-header">User-Friendly Interface</h3>
      <p className="service-overview-text">Authecho is designed to provide a seamless account management experience for users. The intuitive interface allows for effortless navigation and management of accounts. Users can sign in using either their username or email, significantly reducing the risk of losing access to important data. This service is engineered for efficiency, enabling quick updates to usernames, emails, and passwords. With just a few clicks, account management becomes straightforward and accessible.</p>

      <h3 className="service-overview-sub-header">Cross-Platform Compatibility</h3>
      <p className="service-overview-text">Authecho addresses the common frustration of forgotten passwords by streamlining the login process across all supported applications. By allowing users to maintain a single account with a unified password, Authecho simplifies the digital experience. This approach not only enhances productivity but also eliminates the need to remember multiple credentials, enabling users to navigate various applications with ease and efficiency.</p>

      <h3 className="service-overview-sub-header">Robust Security Measures</h3>
      <p className="service-overview-text">Authecho prioritizes the security of user accounts, employing state-of-the-art protocols to protect against unauthorized access. All user data is encrypted to ensure confidentiality and integrity. To further safeguard accounts, Authecho implements a suspension mechanism after five consecutive failed login attempts. Users can easily regain access by retrieving a verification code via email, ensuring that account recovery is both secure and user-friendly.</p>
    </div>
  );
}
